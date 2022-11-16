import Head from 'next/head'
import Image from 'next/image'
import React, { useState, useEffect,useRef } from "react";
import { useRouter } from 'next/router';


export default function Home() {

  const urlInputRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  // url を取得
  const router = useRouter();
  console.log(router.pathname);
  
  //パラメータ取得
  console.log(router.query.url);
  const minturl =router.query.url;

  // クリップボードの作成
  const copyTextToClipboard = () => {
    console.log("urlInputRef.current=" + urlInputRef.current);
    let s = urlInputRef.current;
    navigator.clipboard.writeText(s.value)
    .then(function() {
      console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }
  


  // メタマスク開く Android
  function openAndroidApp(){
    try{
      window.location.href = "metamask://dapp/https://apps.apple.com/"
    } catch {
      alert("please metamask install");
      window.location.href = "https://play.google.com/store/apps/details?id=io.metamask&hl=ja&gl=US"
    }  
  }

  // メタマスク開く IPhone 
  function openIPhoneApp(){
    try{
      window.location.href = "metamask://"
    } catch {
      alert("please metamask install");
      window.location.href = "https://apps.apple.com/jp/app/metamask-blockchain-wallet/id1438144202"
    }  
  }

  return (
    <div>
      <div className="flex flex-col justify-center bg-black bg-center bg-cover">
        <div className="m-1 justify-center">
          <label  className="block text-sm font-medium text-[#02f201]"> Click Copy Url </label>
        </div>
        <div className="m-1 justify-center">
          <input type="url" value={minturl} placeholder="URL" readOnly ref={urlInputRef} onClick={copyTextToClipboard} className="px3 py-1 text-base text-black ease-in-out border border-transparent bg-[#02f201] focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" />
        </div>
        <button><Image className="" src="/Android.png" alt="Main Image" onClick={openAndroidApp} width={500} height={500}/></button>
        <button><Image className="min-w-full" src="/apple.png" alt="Main Image" onClick={openIPhoneApp} width={500} height={500}/></button>
      </div>
    </div>
  )
}
