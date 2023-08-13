import UsersFilter from "./components/UserFilter";
import SearchBox from "./components/SearchBox";
import DatePicker from "./components/DatePicker";
import CardStats from "./components/CardStats";
import CardsData from "./components/cardsData"
import "./styles.css"
import { Table } from "./components/Table";
import { time, client, subscription_options, billing_options, status_options } from "./components/filtersData";
//import { userData } from "./components/userData";




const Invoices = () => {

      

     const cardElement = CardsData.map(data => {
          return <CardStats key={data.id} 
                       title={data.title}
                       invoice={data.invoice}
                       total={data.total}
                       icon={data.icon}
                       percentage={data.percentage}
                       text={data.text}

                 />
    

     })
    return (
        <main>
          <div className="heading-stats">
               <h3 className="text-stats">Statistics</h3>
               <UsersFilter placeholder="All Time" 
                            options={time}
                            defaultValue={time[0]}
                            
                            
                            
               />
          </div>
          <div className="card-list">
               {cardElement}
          </div>
       
          <div className="heading-stats">
               <h3 className="text-stats">Invoices info</h3>
               <SearchBox/>
               <DatePicker/>
               <UsersFilter placeholder="Select client"
                            options={client}
               />
               <UsersFilter placeholder="Select subscription"
                            options={subscription_options}
                            isClearable
                            isMulti
                            
               />
               <UsersFilter placeholder="Select billing"
                            options={billing_options}
                            isClearable
                            isMulti
                            
               />
               <UsersFilter placeholder="Select status"
                            options={status_options}
                            isClearabl
                            isMulti
                            
               />
               
          </div>
               <Table/>
       </main>
       
       
       )
}

export default Invoices;