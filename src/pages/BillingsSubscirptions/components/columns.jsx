import besix from '@assets/BESIX-Logo 1.png';
import blaise from '@assets/blaise.png';
import ColumnToggle from '@common/ColumnToggle/ColumnToggle';
import ActionBtn from '@core/ActionsBtn/ActionBtn';
import Dropdown from '@common/Dropdown/Dropdown';
import { IoClose } from 'react-icons/io5';
import { MdModeEdit, MdRemoveRedEye } from 'react-icons/md';



export const COLUMNS =  [
    {
        Header : 'ID',
        accessor : 'id'
    },
    {
        Header : 'Date',
        accessor : 'date'
    },
    {
        Header : 'Client',
        accessor : 'client',
        Cell :() => {
            
            return (
                <div className='client_data'>
                    <img src={besix} alt="company_logo" />
                    <img className="user_avatar" src={blaise} alt="user_avatar" />
                    <span>Adam ADAM</span>
                </div>
            )
        }
    },
    {
        Header : 'Subscription',
        accessor : 'subscription',
        
    },
    {
        Header : 'Billing',
        accessor : 'billing',
        Cell : ({value}) => {
            
            return (
                <div style={value === 'Annual' ? {color : '#B04FD2', borderColor : '#B04FD2'} : 
                            value === 'Semi-Annual' ? {color : '#C72E3D', borderColor : '#C72E3D'} : 
                            value === 'Quarterly' ? {color : '#D65C18', borderColor : '#D65C18'}: {}} 
                            className="billing_heading">
                    <p>{value}</p>
                </div>
            )
        }
    },              

    {
        Header : 'Total',
        accessor : 'total'
    },
    {
        Header : 'Status', 
        accessor : 'status',
        Cell : ({value}) => {
            
            return (
                <div style={value === 'Paid' ? {color : '#37B34A', background : '#BFFFC9'} : 
                            value === 'Overdue' ? {color : '#ED4C5C', background : '#FFE9EB'} : 
                            value === 'Under Review' ? {color : '#FF772B', background : '#FFECE2'}: 
                            value === 'Partial Payement' ? {color : '#37B34A', borderColor : '#37B34A', border : '1px solid' , background :'none'} : 
                            value === 'Canceled' ? {color : '#8C8C8C', background : '#F1F1F1'}: {}} 
                            className="status_heading"> 


                    <p>{value}</p>
                </div>
            )
        }
    },
    

    
    {
        Header: (obj) => (
          <ColumnToggle
            header
            exclude={['control', 'id']}
            obj={obj}
            // right={25}
            position="left"
          />
        ),
        // accessor: (d) => ({ id: d.id }),
        accessor: 'id',
        disableSortBy: true,
        id: 'control',
        Cell: () => {
        

        return (
        <>
        <ActionBtn className="icon_position"/>
         <Dropdown 
        
        className="actions action-dropdown bordered"
      >
        <li className="title">
          <p>Actions</p>
        </li>

        <li className="delete" >
          <i>
            <IoClose />
          </i>
          <p>Delete</p>
        </li>
        <li className="edit" >
          <i>
            <MdModeEdit />
          </i>
          <p>Edit</p>
        </li>
        <li className="actions-profile" >
          <i>
            <MdRemoveRedEye />
          </i>
          <p>Profile</p>
        </li>
      </Dropdown>
          
          </>
        )
        }
    
    },
]
