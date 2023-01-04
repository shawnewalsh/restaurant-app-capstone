import Head from 'next/head'


function pastOrders() {
    const orders = [
        { createdAt: "2022-12-31 20:32:00", amount: "11.00"},
        { createdAt: "2022-12-31 20:31:00", amount: "11.00"},
        { createdAt: "2022-12-31 20:33:00", amount: "11.00"}
        ]


    return (
        <div>
        <h1>Here are your previous orders...</h1>
        
        <table>
        <tr>
            <th>Order Date</th>
            <th>                  </th>
            <th>Amount</th>
        </tr>
        { orders.map( item  => {
            return (
            <tr key={item.createdAt}>
                <td>{item.createdAt}</td> 
                <td>................</td>
                <td>{item.amount}</td>
            </tr>
        )     
                
     
        })}
           </table>
        </div>
        
    )
}


export default pastOrders;