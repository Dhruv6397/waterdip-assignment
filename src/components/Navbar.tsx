export default function Navbar() {
    const navBar:React.CSSProperties={
      width:'100vw',
      display:'flex',
      alignItems:'center',
      textAlign:'center',
      justifyContent:'center',
      color:'#e1dbd6',
      backgroundColor:'#202020',
      boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.6)',
      height:'4em',
    }
    return (
      <div style={navBar}>
        <h1 style={{color:'rgb(5,127,219)',
        fontWeight: '700',
          fontFamily: '"Libre Baskerville", serif',
          
          }}>HOTEL VISITORS DASHBOARD</h1>
      </div>
    )
  }