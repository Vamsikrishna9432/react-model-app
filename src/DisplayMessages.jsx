import React, {useState} from 'react';
import {useQuery, gql} from "@apollo/client" ;
import Messages from "./Messages" ;
import Model from "./Model";
import {Watch} from "react-loader-spinner" ;
import "./index.css" ;

const DisplayMessages = () => {


    const [model, setModel] = useState({
        toShow : false,
        messageId : null
    });

      const GET_MESSAGES = gql`
          
      query {
        messages {
          items {
            id
            author {
              login
            }
            subject
            body
          }
        }
      }
      `;

    const ReadMore = ({ prop }) => {
        const text = prop;
        const [isReadMore, setIsReadMore] = React.useState(true);
        const toggleReadMore = () => {
          setIsReadMore(!isReadMore);
        };
        return (
          <p className="text">
            {isReadMore ? text.slice(0, 150) : text}
            <span onClick={toggleReadMore} className="read-or-hide">
              {isReadMore ? "  ...read more" : "  show less"}
            </span>
          </p>
        );
      };
    


  const {loading,error,data} = useQuery(GET_MESSAGES) ;

   if (loading) return (<div className='loader'>

    <Watch
     height="100"
     width="100"
     radius="48"
    color="#c70c69"
    ariaLabel="watch-loading"
    wrapperStyle={{}}
    wrapperClassName=""
    visible={true}
      />
   </div>);

   if (error) return (<div className='loader'><h2 className='error-message'>{error.message}</h2></div>);

  return (
    <div className="messages-container">
        {data.messages.items?.map((message, index) =>
          <div key={index} className="message">
            <p><strong>id:  </strong>{message.id}</p>
            <p><strong>subject:  </strong>{message.subject}</p>
            <div><strong>body:  </strong>
              {message.body.length >= 150 ? <ReadMore prop={message.body} /> : message.body}
            </div>
            <div className="button">
              <button onClick={() => setModel({
                boolean: true,
                messageId:  message.id 
              })}
              >View More...</button>
            </div>
          </div>
        )}
        <br />
        {model.boolean ? <Model id={model.messageId} setModel={setModel}/> : null}
        <br />
      </div>

  )
}

export default DisplayMessages