import { BookCopy } from 'lucide-react'
import React from 'react'
import Button from '../components/Button'

const Collections = () => {
  return (
    <div className='flex-1 px-10 py-4 font-outfit'>
      <h1 className='text-2xl font-semibold mb-10'>Collections</h1>
      <div className='border-2 border-slate-200 p-6 h-[60vh] bg-white shadow-lg rounded-xl flex justify-center items-center flex-col gap-4'>
        
      <BookCopy className='w-24 h-24'/>
      <h2 className='text-xl'>Group your products into categories</h2>
      <p className='text-center text-sm max-w-sm text-slate-400'>Use collections to organize your products into categories and galleries for your online store</p>
      <Button mode='dark' name='Create collections'/>
      </div>
    </div>
  )
}

export default Collections
