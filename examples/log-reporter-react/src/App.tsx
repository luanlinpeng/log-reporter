import { useEffect, useState } from 'react'
import { autoReport } from 'dde-log-reporter';


function App() {

  useEffect(() => {

    
    const reporter = new autoReport('platform','http://log-analysis-dev.deep-time.org/ddeAnalytics/utlog', 'guest')

    setTimeout(()=>{
      
      reporter.updateUser('testreporter')

    } , 20 * 1000)

  }, [])


  return (
    <>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
