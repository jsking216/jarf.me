import fs from 'fs';
import matter from 'gray-matter';
import { v4 as uuid } from 'uuid';

const pathPrefix = `${process.cwd()}/blog-content`;

const getBlogFiles = () => {
  const files = fs.readdirSync(pathPrefix, 'utf-8');
  return files.filter((fn) => fn.endsWith('.md'));
};

const getBlogContentsFromFilesArray = (filesArray) => {
  const sortedBlogs = filesArray.map((fn) => {
    const path = `${pathPrefix}/${fn}`;
    const rawContent = fs.readFileSync(path, {
      encoding: 'utf-8',
    });
    const { data, content } = matter(rawContent);

    return { ...data, content, id: uuid() };
  }).sort((a, b) => {
    const sortableA = a.date.split('-').reverse().join('');
    const sortableB = b.date.split('-').reverse().join('');
    return sortableB - sortableA;
  });
  return sortedBlogs;
};

const getFormattedDate = (date) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-US', options);
};

export { getBlogFiles, getBlogContentsFromFilesArray, getFormattedDate };
