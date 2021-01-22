'use strict';
const Service = require('egg').Service;
const puppeteer = require('puppeteer');


class HtmlService extends Service {
  async getHtml(url) {
    const addCookies = async (cookies_str, page, domain) => {
      const cookies = cookies_str.split(';').map(
        pair => {
          const name = pair.trim().slice(0, pair.trim().indexOf('='));
          const value = pair.trim().slice(pair.trim().indexOf('=') + 1);
          return { name, value, domain };
        });
      // await Promise.all(cookies.map(pair => {
      //   console.log(pair);
      //   return page.setCookie(pair);
      // }));
      console.log(cookies);
      page.setCookie(...cookies);
    };
    const browser = await puppeteer.launch({
      defaultViewport: { width: 1920, height: 1080 },
      executablePath: puppeteer.executablePath(),
      headless: true, // 使用无头浏览器抓取
      slowMo: 250,
    });
    console.log('服务正常启动');
    const page = await browser.newPage();
    const ckStr = 'islogin=true; username=liqingwx; loginName=liqingwx; userid=33835; name=liqinwx; newSessionId=l-2712-rUeqfiPDhb';
    addCookies(ckStr, page, 'cattest.migu.cn');
    // page.setExtraHTTPHeaders({
    //   Cookie: 'newSessionId=l-0435-tpXLPATdmo; islogin=true; username=liqingwx; loginName=liqingwx; userid=33835; name=liqinwx',
    //   loginName: 'liqingwx',
    //   newSessionId: 'l-0435-tpXLPATdmo',
    // });
    page.once('load', () => console.log('Page loaded!'));
    // page.goto('http://localhost:8000/api/page/ceno/bc-cnso-static-new/gline/duration-warning/contact-manage', {
    //   waitUntil: [ 'networkidle0' ],
    // });
    page.goto(url, {
      waitUntil: [ 'networkidle0' ],
    });


    await page.waitForNavigation();
    await page.evaluate(async _ => {
      // await window.localStorage.setItem('adminToken', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vc3lzdGVtLnpob3VoYWl5YW5nLmNvbS9hcGkvYWRtaW5Vc2VyL2xvZ2luIiwiaWF0IjoxNjExMzA1OTA3LCJleHAiOjE2MTE2MDgzMDcsIm5iZiI6MTYxMTMwNTkwNywianRpIjoiVEdzMFZMYjIyUXRPSU5QUSIsInN1YiI6MSwicHJ2IjoiZTUzODQyOTgzNDYyYmQ4OTUyYWU1OTIzNjM3YWNhMGU5NmIyNTk4YyJ9.VT3cW-dRpvB2LQluHrGpsOqdBdJx-OfZad6zEHkUHl4');
      await window.sessionStorage.setItem('single', 'new');
      await window.sessionStorage.setItem('isManager', '1');

      await window.sessionStorage.setItem('loginName', 'liqingwx');
      await window.sessionStorage.setItem('newSessionId', 'l-2712-rUeqfiPDhb');
      await window.sessionStorage.setItem('STORAGE_PUBLIC_KEY', `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgD3NACwSFI1lUil6rFq+wDRPfuwBtLSG
      kXjmDTxKhy2Ckos9FWq8x8UANvQ/AJgNUDWpuxXPmN5XQ/rV8KI5ZcDEbngjh/NbiixHQHkkgGK+
      rj242ITNSSuqu6YxfV7kB2zTUaYgZlGgjpNoGYlWSdF24820js0ZyVFIOL76zIlZXW32ft1La5Yc
      lefd/EinmDL/Dvt5BbGmnDiGugFHGCBWRfp9rupqMCsmAO/LQdA+410T1DPJJPmo+A2ucN4fVz6c
      PXFXGo+Njrs2sPf0GxSXmf7/hAXqotMtgYupAhICk2+W5XwFvH3ZVuPpqOBbn35dBq8WwcNMZTun
      0hhNtwIDAQAB`);
      await window.sessionStorage.setItem('islogin', 'true');
      await window.sessionStorage.setItem('username', 'liqinwx');
      await window.sessionStorage.setItem('userid', '33835');
      await window.sessionStorage.setItem('name', 'liqinwx');
      await window.localStorage.setItem('liqingwx', '{"groupId":704,"groupName":"测试素材组","parentGroupCode":"11397","groupCode":"704","groupType":"2","ext1":"{"sourceCode":"20000"}","ext2":2,"extParams":"{"sourceCode":"20000"}"}');
    });
    // const www = await page.evaluate(async _ => {
    //   return localStorage.getItem;
    // });
    // console.log(www);
    console.log('页面加载');
    addCookies(ckStr, page, 'cattest.migu.cn');
    page.goto(url, {
      waitUntil: [ 'networkidle0' ],
    });
    await page.waitForNavigation();
    const bodyHandle = await page.$('body');
    const pngfile = await page.screenshot({
      path: 'screenshot.png',
      fullPage: true,
      encoding: 'base64',
    });
    const html = await page.evaluate(body => body.innerHTML, bodyHandle);
    // const pngfile = png.toString('base64');
    // 关闭无头浏览器
    return { html, pngfile };
  }
}

module.exports = HtmlService;
