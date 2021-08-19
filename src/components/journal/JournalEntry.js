import React from 'react'

export const JournalEntry = () => {
   return (
      <div className="journal__entry pointer">
         <div
            className="journal__entry-picture"
            style={{
               backgroundSize: "cover",
               backgroundImage: "url(https://wallpaperaccess.com/full/51360.jpg)",
            }}
         >
         </div>
         <div className="journal__entry-body">
            <p className="journal__entry-title">
               Un nuevo dia
            </p>
            <p className="journal__entry-content">
               Velit qui in et laboris reprehenderit Lorem cupidatat nostrud occaecat.
            </p>
         </div>

         <div className="journal__entry-date-box">
            <span>Monday</span>
            <h4>28</h4>
         </div>

      </div>
   )
}
