import { useContext, useState } from 'react';
import { NextPage, GetServerSideProps } from 'next'
import { Layout } from "@/components/Layouts";
import { DataGrid, GridRenderCellParams, GridColDef } from '@mui/x-data-grid';
import NextLink from 'next/link';
import { ISubmission, IUser } from "@/interfaces";
import { AuthContext } from '@/context/auth';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import submissionApi from '@/api/submissionApi';

/*
  Downgrade of @emotion/react from version 11.10.4 to 11.9.3 should solve this issue.
  There is some issue with imports and / on Windows.
*/
interface Props {
    submissions:ISubmission[],
}

const columns: GridColDef[] = [
  { field: 'title', headerName: 'SUBMISSION TITLE', minWidth:250, flex:1, headerClassName:'SubmissionApp--header' },
  { field: 'doctorname', headerName: 'DOCTOR ASSIGNED', minWidth:200, flex:1, headerClassName:'SubmissionApp--header' },
  { field: 'createdat', headerName: 'CREATED AT', minWidth:100, flex:1, headerClassName:'SubmissionApp--header' },
  {
    field: 'status',
    headerName: 'STATUS',
    description: 'Shows if status is Pending, In progress or Done',
    minWidth: 100,
    flex:1,
    headerClassName:'SubmissionApp--header',
    renderCell: (params: GridRenderCellParams ) => {
        return (
                params.row.status === 'Pending' ? <p className="px-3 py-1 text-blue-800 rounded-full bg-blue-100">Pending</p> 
                : params.row.status === 'In progress' ? <p className="px-3 py-1 text-green-800 rounded-full bg-green-200">In progress</p>
                : <p className="px-3 py-1 rounded-full bg-zinc-200">Done</p>
                
            )
    }
  },
  {   field: 'viewmore', 
      headerName: '', 
      minWidth:130 ,
    //   flex:1,
      sortable:false,
      headerClassName:'SubmissionApp--header',
      cellClassName:'link',
      renderCell: (params: GridRenderCellParams) => {
          return (
              <NextLink href={`/patient/submissions/${params.row.id}`} passHref>
                  <p className="hover:underline">View more</p>
              </NextLink>
          )
      }

  },
];

// datos de relleno
// const rows = [
//     { id:1, title: 'Hepatic infarction', doctorname:'Theresa Webb', createdat: '3/4/16', status:'Pending' },
//     { id:2, title: "Reye's syndrome", doctorname:'Eleanor Pena', createdat: '1/5/12', status:'Pending' },
//     { id:3, title: 'Hepatic necrosis', doctorname:'Arlene McCoy', createdat: '5/7/16', status:'Pending' },
//     { id:4, title: 'Angioedema', doctorname:'Darlene Robertson', createdat: '5/19/12', status:'Pending' },
//     { id:5, title: 'Pancreatitis acute', doctorname:'Jane Cooper', createdat: '9/23/16', status:'Pending' },
//     { id:6, title: 'Hepatic necrosis', doctorname:'Jane Cooper', createdat: '10/28/12', status:'Pending' },
//     { id:7, title: 'Product contamination microbial', doctorname:'Jacob Jones', createdat: '10/28/12', status:'Pending' },
//     { id:8, title: 'Hepatic necrosis', doctorname:'Arlene McCoy', createdat: '10/18/12', status:'Pending' },
//     { id:9, title: 'Product contamination microbial', doctorname:'Arlene McCoy', createdat: '10/28/12', status:'Pending' },
//     { id:10, title: 'Angioedema', doctorname:'Arlene McCoy', createdat: '10/28/12', status:'Pending' },
//     { id:11, title: 'Angioedema', doctorname:'Arlene McCoy', createdat: '10/28/12', status:'Pending' },
//     { id:12, title: 'Angioedema', doctorname:'Arlene McCoy', createdat: '10/28/12', status:'Pending' },
//     { id:13, title: 'Angioedema', doctorname:'Arlene McCoy', createdat: '10/28/12', status:'Pending' },
// ];


const PatientHomePage: NextPage<Props> = ({ submissions }) => { 
    
    const [submissionFilter, setSubmissionFilter] = useState('All');
    
    const filterHandleChange = (event:SelectChangeEvent) => {
        setSubmissionFilter(event.target.value);
    }


    const rows = submissions.filter((s) => { return submissionFilter === 'All' ? (s.status !== '') : s.status === submissionFilter })
                .map((submission) => ({
                    id: submission.submissionId,
                    title: submission.title,
                    doctorname: submission.doctorName,
                    createdat: submission.created_at.substring(0, submission.created_at.indexOf('T')),
                    status: submission.status,
                }));

    return (
        <Layout title='Home'>
            {/* <div className="py-5 w-full h-screen"> */}
            <div className="py-5 w-full h-[calc(100%-80px)]">
                <div className="flex justify-end pb-3">
                    <Select
                        value={submissionFilter}
                        onChange={filterHandleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        IconComponent={ UnfoldMoreOutlinedIcon }
                        sx={{
                            height:'40px',
                            paddingRight:'40px',
                        }}
                    >
                        <MenuItem value='All'>All submissions</MenuItem>
                        <MenuItem value='Pending'>Pending</MenuItem>
                        <MenuItem value='In progress'>In progress</MenuItem>
                        <MenuItem value='Done'>Done</MenuItem>
                    </Select>
                </div>
                <DataGrid 
                    sx={{
                        // '.MuiDataGrid-columnSeparator': {
                        //     display: 'none',
                        //   }
                        '.SubmissionApp--header': {
                            backgroundColor: 'RGB(245, 245, 245)',
                            color: 'gray',
                        },
                        '.even':{ //par
                            backgroundColor: 'RGB(255, 255, 255)',
                        },
                        '.odd':{ //impar
                            backgroundColor: 'RGB(245, 245, 245)',
                        },
                        '.link': {
                            color: '#0000EE',
                        },
                        //General styles
                        borderRadius:'7px',
                        borderWidth: '2px'

                    }}
                    initialState={{
                    pagination: { paginationModel: { pageSize: 10 } }
                    }}
                    columns={ columns } 
                    rows={ rows } 
                    autoPageSize
                    rowHeight={50}
                    // autoHeight
                    // pageSizeOptions={[5, 10, 25]}
                    getRowClassName={(params) =>
                        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                    }
                />
            </div>
        </Layout>
    )
}
  

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session:any = await getServerSession(ctx.req, ctx.res, authOptions);
    
    // console.log("***** session")
    // console.log({session});
    const body = { patientId: session?.user.id };
    const { data } = await submissionApi.get<ISubmission[]>('/patients/submissions',{ data: body, headers: { 'Content-Type': 'application/json' } });
    
    // console.log({data});

    return {
        props: {
            submissions: JSON.parse(JSON.stringify(data)),
        }
    }
}
export default PatientHomePage;
