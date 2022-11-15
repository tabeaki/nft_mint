import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect,useRef } from "react";
// QRCodeFileGen.ts
import QRCode from "qrcode";



export default function Home() {
  const [code, setCode] = useState("");
  const [url, setUrl] = useState("");
  const [imageHiddenFlag, setImageHiddenFlag] = useState(false);
  const urlInputRef =  React.useRef() as React.MutableRefObject<HTMLInputElement>;

  async function qrCreate() {
    // 入力されたURLを取得
    console.log("urlInputRef=" + urlInputRef.current.value);

    const url = '/metamaskOpen?url=' + urlInputRef.current.value // URLの指定ができます。
    const width = 300                // widthの指定ができます。
    QRCode.toDataURL(url, { width: width })
      .then(code => {
        // コード(URLスキーム)が生成されるので、imgタグのsrc=の中に値を入れましょう
        console.log(code)
        setCode(code);
        setImageHiddenFlag(true);
      })
      .catch(err => {
        console.error(err)
      })
  }
  return (
    <div>
      <div className="flex flex-col buttom justify-center bg-black bg-center bg-cover">
        <div className="m-1">
          <label  className="block text-sm font-medium text-[#02f201]"> Opensea Collection URL </label>
        </div>
        <div className="m-1">
          <input type="text" placeholder="URL" ref={urlInputRef} className="px3 py-1 text-base text-black ease-in-out border 
          border-transparent bg-[#02f201] focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white
           focus:ring-offset-2 focus:ring-offset-gray-300" value={url} onChange={(event) => setUrl(event.target.value)} />
        </div>
        <div className="m-3">
          <button className="shadow-lg px-8 py-1  bg-[#02f201] text-lg text-black font-impact hover:bg-[#02f201] hover:shadow-sm hover:translate-y-0.5 transform transition "onClick={() => qrCreate()}>QRコード生成</button>
        </div>
        { (imageHiddenFlag) &&<Image className="min-w-full bg-black" src={code} alt="Main Image" width={300} height={300}/>}
      </div>
    </div>
  )
}
