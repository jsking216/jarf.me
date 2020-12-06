import fs from 'fs';
/*
import matter from 'gray-matter';
import html from 'remark-html';
import highlight from 'remark-highlight.js';
import unified from 'unified';
import markdown from 'remark-parse';
import { v4 as uuid } from 'uuid';
*/
const pathPrefix = `${process.cwd()}/blog-content`;

const files = fs.readdirSync(pathPrefix, 'utf-8');
const getBlogFiles = () => files.filter((fn) => fn.endsWith('.md'));

export default getBlogFiles;
