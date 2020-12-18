"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const date_fns_1 = require("date-fns");
const path_1 = __importDefault(require("path"));
const md5_file_1 = __importDefault(require("md5-file"));
class SiteMapper {
    constructor({ alternateUrls, baseUrl, extraPaths, ignoreIndexFiles, ignoredPaths, pagesDirectory, targetDirectory, sitemapFilename, nextConfigPath, ignoredExtensions, pagesConfig, sitemapStylesheet, lastmodHashFile }) {
        this.pagesConfig = pagesConfig || {};
        this.alternatesUrls = alternateUrls || {};
        this.baseUrl = baseUrl;
        this.ignoredPaths = ignoredPaths || [];
        this.extraPaths = extraPaths || [];
        this.ignoreIndexFiles = ignoreIndexFiles || false;
        this.ignoredExtensions = ignoredExtensions || [];
        this.pagesdirectory = pagesDirectory;
        this.targetDirectory = targetDirectory;
        this.sitemapFilename = sitemapFilename || 'sitemap.xml';
        this.nextConfigPath = nextConfigPath;
        this.sitemapStylesheet = sitemapStylesheet || [];
        this.lastmodHashFile = lastmodHashFile;
        this.sitemapTag = '<?xml version="1.0" encoding="UTF-8"?>';
        this.sitemapUrlSet = `
      <urlset xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
      http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" 
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
      xmlns:xhtml="http://www.w3.org/1999/xhtml">
      `;
        if (this.nextConfigPath) {
            this.nextConfig = require(nextConfigPath);
            if (typeof this.nextConfig === 'function') {
                this.nextConfig = this.nextConfig([], {});
            }
        }
    }
    preLaunch() {
        let xmlStyle = '';
        if (this.sitemapStylesheet) {
            this.sitemapStylesheet.forEach(({ type, styleFile }) => { xmlStyle += `<?xml-stylesheet href="${styleFile}" type="${type}" ?>\n`; });
        }
        fs_1.default.writeFileSync(path_1.default.resolve(this.targetDirectory, './', this.sitemapFilename), this.sitemapTag + xmlStyle + this.sitemapUrlSet, {
            flag: 'w'
        });
    }
    finish() {
        fs_1.default.writeFileSync(path_1.default.resolve(this.targetDirectory, './', this.sitemapFilename), '</urlset>', {
            flag: 'as'
        });
    }
    isReservedPage(site) {
        let isReserved = false;
        if (site.charAt(0) === '_' || site.charAt(0) === '.')
            isReserved = true;
        return isReserved;
    }
    isIgnoredPath(site) {
        let toIgnore = false;
        for (const ignoredPath of this.ignoredPaths) {
            if (ignoredPath instanceof RegExp) {
                if (ignoredPath.test(site))
                    toIgnore = true;
            }
            else {
                if (site.includes(ignoredPath))
                    toIgnore = true;
            }
        }
        return toIgnore;
    }
    isIgnoredExtension(fileExtension) {
        let toIgnoreExtension = false;
        for (const extensionToIgnore of this.ignoredExtensions) {
            if (extensionToIgnore === fileExtension)
                toIgnoreExtension = true;
        }
        return toIgnoreExtension;
    }
    mergePath(basePath, currentPage) {
        let newBasePath = basePath;
        if (!basePath && !currentPage)
            return '';
        if (!newBasePath) {
            newBasePath = '/';
        }
        else if (currentPage) {
            newBasePath += '/';
        }
        return newBasePath + currentPage;
    }
    buildPathMap(dir) {
        let pathMap = {};
        const data = fs_1.default.readdirSync(dir);
        for (const site of data) {
            if (this.isReservedPage(site))
                continue;
            // Filter directories
            const nextPath = dir + path_1.default.sep + site;
            if (fs_1.default.lstatSync(nextPath).isDirectory()) {
                pathMap = {
                    ...pathMap,
                    ...this.buildPathMap(dir + path_1.default.sep + site)
                };
                continue;
            }
            const fileExtension = site.split('.').pop();
            if (this.isIgnoredExtension(fileExtension))
                continue;
            let fileNameWithoutExtension = site.substring(0, site.length - (fileExtension.length + 1));
            fileNameWithoutExtension = this.ignoreIndexFiles && fileNameWithoutExtension === 'index' ? '' : fileNameWithoutExtension;
            let newDir = dir.replace(this.pagesdirectory, '').replace(/\\/g, '/');
            if (newDir === '/index')
                newDir = '';
            const pagePath = this.mergePath(newDir, fileNameWithoutExtension);
            pathMap[pagePath] = {
                page: pagePath
            };
            if (this.lastmodHashFile && !fs_1.default.statSync(nextPath).isDirectory()) {
                pathMap[pagePath].md5 = md5_file_1.default.sync(nextPath);
            }
        }
        return pathMap;
    }
    checkTrailingSlash() {
        if (!this.nextConfig)
            return false;
        const { exportTrailingSlash, trailingSlash } = this.nextConfig;
        const next9OrlowerVersion = typeof exportTrailingSlash !== 'undefined';
        const next10Version = typeof trailingSlash !== 'undefined';
        if ((next9OrlowerVersion || next10Version) && (exportTrailingSlash || trailingSlash))
            return true;
        return false;
    }
    async getSitemapURLs(dir) {
        let pathMap = this.buildPathMap(dir);
        const exportTrailingSlash = this.checkTrailingSlash();
        const exportPathMap = this.nextConfig && this.nextConfig.exportPathMap;
        if (exportPathMap) {
            try {
                pathMap = await exportPathMap(pathMap, {});
            }
            catch (err) {
                console.log(err);
            }
        }
        const lastmods = [];
        const defaultLastmod = date_fns_1.format(new Date(), 'yyyy-MM-dd');
        if (this.lastmodHashFile) {
            const lastmodHashes = fs_1.default.existsSync(this.lastmodHashFile) ? require(this.lastmodHashFile) : {};
            for (const [key, val] of Object.entries(pathMap)) {
                if (lastmodHashes[key] && lastmodHashes[key].md5 === val.md5) {
                    lastmods[key] = lastmodHashes[key].date;
                }
            }
        }
        const paths = Object.keys(pathMap).concat(this.extraPaths);
        return paths.map(pagePath => {
            let outputPath = pagePath;
            if (exportTrailingSlash) {
                outputPath += '/';
            }
            let priority = '';
            let changefreq = '';
            if (this.pagesConfig && this.pagesConfig[pagePath.toLowerCase()]) {
                const pageConfig = this.pagesConfig[pagePath.toLowerCase()];
                priority = pageConfig.priority;
                changefreq = pageConfig.changefreq;
            }
            return {
                pagePath,
                outputPath,
                priority,
                changefreq,
                lastmod: lastmods[pagePath] || defaultLastmod
            };
        });
    }
    async sitemapMapper(dir) {
        const urls = await this.getSitemapURLs(dir);
        const filteredURLs = urls.filter(url => !this.isIgnoredPath(url.pagePath));
        let lastmods = [];
        filteredURLs.forEach((url) => {
            let alternates = '';
            let priority = '';
            let changefreq = '';
            for (const langSite in this.alternatesUrls) {
                alternates += `<xhtml:link rel="alternate" hreflang="${langSite}" href="${this.alternatesUrls[langSite]}${url.outputPath}" />`;
            }
            if (url.priority) {
                priority = `<priority>${url.priority}</priority>`;
            }
            if (url.changefreq) {
                changefreq = `<changefreq>${url.changefreq}</changefreq>`;
            }
            if (this.lastmodHashFile) {
                const isHTML = fs_1.default.existsSync(`${dir}${url.pagePath}.html`);
                lastmods[url.pagePath] = {
                    date: date_fns_1.format(new Date(), 'yyyy-MM-dd'),
                    md5: isHTML ? md5_file_1.default.sync(`${dir}${url.pagePath}.html`) : 'bleh'
                };
            }
            const xmlObject = `<url><loc>${this.baseUrl}${url.outputPath}</loc>${''}
                ${alternates}${''}
                ${priority}${''}
                ${changefreq}${''}
                <lastmod>${url.lastmod}</lastmod>
                </url>`;
            fs_1.default.writeFileSync(path_1.default.resolve(this.targetDirectory, './', this.sitemapFilename), xmlObject, {
                flag: 'as'
            });
        });
        if (this.lastmodHashFile) {
            fs_1.default.writeFileSync(this.lastmodHashFile, JSON.stringify(lastmods));
        }
    }
}
exports.default = SiteMapper;
