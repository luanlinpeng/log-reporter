import { useEffect, useState } from 'react'
import { AutoReport } from 'dde-log-reporter';


function App() {

  useEffect(() => {

    window.reporter = new AutoReport('platform', 'http://log-analysis-dev.deep-time.org/ddeAnalytics/utlog', 'http://log-analysis-dev.deep-time.org/ddeAnalytics/utlog/authToken', 'guest');
    
    setTimeout(()=>{
      console.log('user');
      window.reporter.updateUser('test')

    }, 10 * 1000)

    setTimeout(()=>{
      console.log('user');
      window.reporter.sendPageOpenEvent('测试页面')

    } , 15 * 1000)

  }, [])


  const handleClick = () => {
    window.reporter.sendClkEvent('terst','ddere')
  }


  return (
    <>
      <p className="read-the-docs">
        <button onClick={handleClick}>ddde</button>
        <button onClick={() => {
                window.reporter.sendPageOpenEvent('testpage')

        }}>page</button>

        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
