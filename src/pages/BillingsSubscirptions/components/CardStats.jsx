


const CardStats = ({title, invoice, total, icon, percentage}) => {

    return (
       <div className="card-data"> 
         <div className="card-stats">
            <p className="card-text">{title}</p>
            <div className='comparison-stats'>
              <h3 className="invoices-number">{invoice}</h3>
              <img className="down" src={`/src/assets/icons/${icon}.png`} alt="down" />
              <p className="percentage" style={icon === 'up' ? {color : '#47CA5B'}: {color : '#ED4C5C'}}>{percentage}</p>
              <p className='comparison-text'></p>
            </div>
            <h4 className="invoices-sum">{total}</h4>
        </div>
       </div>
       
       )
}

export default CardStats;