'use client'

import React from 'react'
import './sidebar.css'
import { useState, useEffect } from 'react'

export default function Sidebar() {

  const [minimize, setMinimize] = useState(false);
  const toggleMinimize = () => {
    setMinimize(!minimize);
  };

  useEffect(() => {
    if (minimize) {
      document.body.style.paddingLeft = '60px';
    }
    else {
      document.body.style.paddingLeft = '300px';
    }
  }, [minimize]);

  return (
    <section className={`sidebar ${minimize ? 'sidebar-hide' : ''}`}  >
      <h1 className={`logo ${minimize ? 'opacity-0' : ''}`}>Vaulta</h1>

      <div className='sidebar-link-box'>
        <button className={`sidebar-link ${minimize ? 'justify-end' : ''}`}>
          <svg className='sidebar-link-svg' width="auto" height="auto" viewBox="0 0 24 24" fill="#696868" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.3861 1.21065C11.7472 0.929784 12.2528 0.929784 12.6139 1.21065L21.6139 8.21065C21.8575 8.4001 22 8.69141 22 9V20.5C22 21.3284 21.3284 22 20.5 22H15V14C15 13.4477 14.5523 13 14 13H10C9.44772 13 9 13.4477 9 14V22H3.5C2.67157 22 2 21.3284 2 20.5V9C2 8.69141 2.14247 8.4001 2.38606 8.21065L11.3861 1.21065Z" fill="#696868"></path> </g></svg>
          <p className={`${minimize ? 'hidden' : ''}`}>Overview</p>
        </button>

        <button className={`sidebar-link ${minimize ? 'justify-end' : ''}`}>
          <svg className='sidebar-link-svg' fill="#696868" width="auto" height="auto" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" transform="rotate(270)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.0020048,13 C17.5542895,13 18.0020048,13.4477153 18.0020048,14 C18.0020048,14.5128358 17.6159646,14.9355072 17.1186259,14.9932723 L17.0020048,15 L5.41700475,15 L8.70911154,18.2928932 C9.0695955,18.6533772 9.09732503,19.2206082 8.79230014,19.6128994 L8.70911154,19.7071068 C8.34862757,20.0675907 7.78139652,20.0953203 7.38910531,19.7902954 L7.29489797,19.7071068 L2.29489797,14.7071068 C1.69232289,14.1045317 2.07433707,13.0928192 2.88837381,13.0059833 L3.00200475,13 L17.0020048,13 Z M16.6128994,4.20970461 L16.7071068,4.29289322 L21.7071068,9.29289322 C22.3096819,9.8954683 21.9276677,10.9071808 21.1136309,10.9940167 L21,11 L7,11 C6.44771525,11 6,10.5522847 6,10 C6,9.48716416 6.38604019,9.06449284 6.88337887,9.00672773 L7,9 L18.585,9 L15.2928932,5.70710678 C14.9324093,5.34662282 14.9046797,4.77939176 15.2097046,4.38710056 L15.2928932,4.29289322 C15.6533772,3.93240926 16.2206082,3.90467972 16.6128994,4.20970461 Z"></path> </g></svg>
          <p className={`${minimize ? 'hidden' : ''}`}>Transactions</p>
        </button>

        <button className={`sidebar-link ${minimize ? 'justify-end' : ''}`}>
          <svg className='sidebar-link-svg' fill="#696868" height="auto" width="auto" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M276.211,0.792v163.086c19.389,4.236,36.553,14.415,49.463,28.559l141.237-81.543 C424.329,49.121,355.325,6.971,276.211,0.792z"></path> </g> </g> <g> <g> <path d="M487.159,145.878L345.9,227.434c2.86,9.011,4.415,18.604,4.415,28.566c0,45.15-31.733,82.869-74.108,92.122v163.085 C408.145,500.904,512,390.583,512,256C512,216.573,503.079,179.234,487.159,145.878z"></path> </g> </g> <g> <g> <path d="M235.789,163.878V0.792C103.854,11.097,0,121.418,0,256c0,134.581,103.852,244.902,235.787,255.208V348.121 c-42.372-9.255-74.103-46.972-74.103-92.121C161.684,210.85,193.416,173.133,235.789,163.878z"></path> </g> </g> </g></svg>
          <p className={`${minimize ? 'hidden' : ''}`}>Budgets</p>
        </button>

        <button className={`sidebar-link ${minimize ? 'justify-end' : ''}`}>
          <svg className='sidebar-link-svg' fill="#696868" height="auto" width="auto" version="1.1" xmlns="http://www.w3.org/2000/svg"viewBox="0 0 195.099 195.099"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M87.715,100.624h4.834v18.008h-4.834c-4.963,0-9.001-4.038-9.001-9.007C78.714,104.662,82.752,100.624,87.715,100.624z M106.568,146.639c4.965,0,9.004-4.039,9.004-9.004c0-4.964-4.039-9.003-9.004-9.003h-4.02v18.007H106.568z M160.023,186.107 c-5.301,5.714-12.812,8.991-20.605,8.991H55.681c-7.794,0-15.305-3.277-20.605-8.991c-5.301-5.715-8.006-13.449-7.422-21.222 l8.398-111.688c0.196-2.608,2.37-4.625,4.986-4.625h25.533V30.307C66.571,13.596,80.167,0,96.878,0h1.343 c16.711,0,30.307,13.596,30.307,30.307v18.267h25.533c2.616,0,4.79,2.017,4.986,4.625l8.398,111.688 C168.029,172.658,165.324,180.393,160.023,186.107z M76.571,48.573h41.956V30.307c0-11.197-9.109-20.307-20.307-20.307h-1.343 c-11.197,0-20.307,9.109-20.307,20.307V48.573z M102.549,118.632v-18.008h18.023c2.762,0,5-2.238,5-5s-2.238-5-5-5h-18.023v-3.147 c0-2.762-2.238-5-5-5s-5,2.238-5,5v3.147h-4.834c-10.478,0-19.001,8.523-19.001,19.006c0,10.478,8.523,19.002,19.001,19.002h4.834 v18.007H73.714c-2.762,0-5,2.238-5,5s2.238,5,5,5h18.835v4.66c0,2.762,2.238,5,5,5s5-2.238,5-5v-4.66h4.02 c10.479,0,19.004-8.525,19.004-19.004s-8.525-19.003-19.004-19.003H102.549z"></path> </g></svg>
          <p className={`${minimize ? 'hidden' : ''}`}>Pots</p>
        </button>

        <button className={`sidebar-link ${minimize ? 'justify-end' : ''}`}>
          <svg className='sidebar-link-svg' fill="#696868" height="auto" width="auto" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M434.83,1.624c-7.967-3.301-17.148-1.478-23.249,4.625L383.999,33.83L356.418,6.249c-8.33-8.331-21.838-8.331-30.17,0 L298.666,33.83L271.085,6.249c-8.33-8.331-21.838-8.331-30.169,0L213.333,33.83L185.752,6.249c-8.33-8.331-21.838-8.331-30.169,0 L128,33.83L100.419,6.249c-6.1-6.103-15.277-7.926-23.249-4.625C69.198,4.927,64,12.705,64,21.333v469.332 c0,11.782,9.552,21.333,21.333,21.333h341.332c11.782,0,21.333-9.552,21.333-21.333V21.333 C447.999,12.705,442.802,4.927,434.83,1.624z M298.666,426.667h-128c-11.782,0-21.333-9.553-21.333-21.333 c0-11.783,9.552-21.333,21.333-21.333h128c11.782,0,21.333,9.55,21.333,21.333C319.999,417.114,310.447,426.667,298.666,426.667z M341.332,341.334H170.666c-11.782,0-21.333-9.553-21.333-21.333c0-11.783,9.552-21.333,21.333-21.333h170.666 c11.782,0,21.333,9.55,21.333,21.333C362.666,331.781,353.114,341.334,341.332,341.334z M149.333,234.667 c0-11.783,9.552-21.333,21.333-21.333h128c11.782,0,21.333,9.55,21.333,21.333c0,11.78-9.552,21.333-21.333,21.333h-128 C158.885,256.001,149.333,246.448,149.333,234.667z M341.332,170.668H170.666c-11.782,0-21.333-9.553-21.333-21.333 c0-11.783,9.552-21.333,21.333-21.333h170.666c11.782,0,21.333,9.55,21.333,21.333 C362.666,161.115,353.116,170.668,341.332,170.668z"></path> </g> </g> </g></svg>
          <p className={`${minimize ? 'hidden' : ''}`}>Recurring bills</p>
        </button>    
      </div>

      <button className={`sidebar-link minimize-menu-link ${minimize ? 'justify-end pr-5' : ''}`} onClick={toggleMinimize}>
        <svg className={`sidebar-link-svg ${minimize ? 'rotateSidebarLink' : ''}`} width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 4V20M8 12H20M8 12L12 8M8 12L12 16" stroke="#696868" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        <p className={`${minimize ? 'hidden' : ''}`}>Minimize Menu</p>
      </button>
    </section>
  )
}
