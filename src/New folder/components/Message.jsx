import React from 'react';
import { withTheme } from 'styled-components';

import { MessageBlobBot, MessageBlobUser } from '../primitives/MessageBlob';
import Avatar from '../primitives/Avatar';
import AnswerButton from '../primitives/AnswerButton';
import Image from '../primitives/Image';

const Message = (props) => {
  const { image, message, active, theme } = props;

  return (
    <section>
      {message.sender === 'BOT' ?
        <p>
          <Avatar left>
            {theme.bot}
          </Avatar>
          <MessageBlobBot>
            {message.text}
          </MessageBlobBot>
          {message.image &&
            <Image>
              <img style={{height:200,width:200}} src={message.image} alt={message.text} />
            </Image>
          }
          {message.buttons && active &&
            <div>
              {message.buttons.map((button, index) =>
                <AnswerButton key={index} onClick={() => props.onButtonSelect(button)}>
                  {button.text}
                </AnswerButton>
              )}
            </div>
          }
          {/*message.type === 'final' &&
            Object.keys(answers).map((answer, index) =>
              <div key={index}>
                {answer}
                <span>{answers[answer]}</span>
              </div>
            )
          */}
        </p>
        :
        <p>

          <Avatar right>
            {theme.user}
          </Avatar>
           
           <MessageBlobUser><div>{message.text}</div></MessageBlobUser>
           <br/>

        </p>
      }
    </section>
  );
}

export default withTheme(Message);
