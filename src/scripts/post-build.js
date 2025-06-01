import fs from 'fs'
// import { promises as fs } from 'fs'
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
  const newsTpl = fs.readdirSync(`${distDir}/peco-template/news`);
  newsTpl.forEach((file) => {
    fs.rename(
      `${distDir}/peco-template/news/${file}`,
      `${distDir}/peco-template/news/${file.replace('.html', '')}`,
      (err) => {
        if (err) throw err;
      }
    );
  });
  const whatsNewTpl = fs.readdirSync(`${distDir}/peco-template/whats-new`);
  whatsNewTpl.forEach((file) => {
    fs.rename(
      `${distDir}/peco-template/whats-new/${file}`,
      `${distDir}/peco-template/whats-new/${file.replace('.html', '')}`,
      (err) => {
        if (err) throw err;
    });
  });
  console.log('change all file exist ".tpl.html -> .tpl"');
}
htmlToTpl(distDir);


const movePecoTemplate = async (targetPath) => {
  const pecoPath = 'dist/__peco-template__';
  if (fs.existsSync(pecoPath)) {
    await fs.promises.rm(pecoPath, { recursive: true, force: true });
  }
  fs.renameSync(`${distDir}/peco-template`, pecoPath);
  console.log('move "__peco-template__" to "./dist"');
}
movePecoTemplate(distDir);
