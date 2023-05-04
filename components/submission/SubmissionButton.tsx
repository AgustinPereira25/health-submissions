import React from 'react'
import { ISubmission } from '@/interfaces'

interface Props{
    submission: ISubmission;
    handleClick: () => void; //function called in parent element.
}

export const SubmissionButton:React.FC<Props> = ({ submission, handleClick }) => {
  return (
    <>
        {
            submission.status !== 'Done' 
            && (
            <div className="flex flex-1 justify-end">
                <div>
                  <button 
                    className='text-sm font-medium text-white rounded-lg px-3 py-2 bg-blue-600 hover:bg-blue-500 tracking-wide'
                    onClick={ handleClick }
                  >
                    { submission.status === 'Pending' ? 'Accept submission' : 'Finish submission'}
                  </button>
                </div>
            </div>
            ) 
        }
    </>
  )
}

export default SubmissionButton