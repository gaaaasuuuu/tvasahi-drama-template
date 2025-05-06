import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { directory } from '../settings.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const distDir = `dist/${directory}`
const delDir = ['__dummy__']


/**
 * ディレクトリを削除する
 * @param targetPath 対象ディレクトリ
 * @param deletePaths targetPathから削除するディレクトリ
 */
const deleteDir = (targetPath, deletePaths) => {
  const targetDir = path.join(__dirname, '../../' + targetPath)
  if (!fs.existsSync(targetDir)) return
  deletePaths.forEach((removePath) => {
    const removeDir = path.join(targetDir, removePath)
    if (!fs.existsSync(removeDir)) return
    fs.rm(removeDir, { recursive: true }, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log(`👉 Deleted ${removeDir}`)
      }
    })
  })
}
deleteDir(distDir, delDir);


const htmlToTpl = (targetPath) => {
  const TPL_FILE = 'news/peco_template.tpl.html';
  const targetDir = path.join(__dirname, '../../' + targetPath);
  if (!fs.existsSync(targetDir)) return;
  fs.rename(
    `${targetDir}/${TPL_FILE}`,
    `${distDir}/${TPL_FILE.replace('.html', '')}`,
    (err) => {
      if (err) throw err;
      console.log('change file exist ".tpl.html -> .tpl"');
  });
}
htmlToTpl(distDir);
