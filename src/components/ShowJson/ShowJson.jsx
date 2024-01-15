import React from 'react'

function ShowJson({jsonFields}) {
  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", }}>
        <h2 style={{marginBottom: "10px"}}>JSON Data</h2>
       <pre>{JSON.stringify(jsonFields, null, 2)}</pre>
    </div>
  )
}

export default ShowJson