import React from 'react'
import { ISubmission } from '@/interfaces'

interface Props{
    submission: ISubmission;
}

export const SubmissionButton:React.FC<Props> = ({ submission }) => {
  return (
    <>
        {
            submission.status !== 'Done' 
            && (
            <div className="flex flex-1 justify-end">
                <div>
                  <button className='text-sm font-medium text-white rounded-lg px-3 py-2 bg-blue-600 hover:bg-blue-500 tracking-wide'>{ submission.status === 'Pending' ? 'Accept submission' : 'Finish submission'}</button>
                </div>
            </div>
            ) 
        }
    </>
  )
}

export default SubmissionButton