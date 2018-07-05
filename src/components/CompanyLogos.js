import React from 'react'
import { Image } from 'semantic-ui-react'
import styled from 'styled-components'

const Logos = styled.div`
  display: block;
  text-align: center;
  margin: 0 -25vw;
  margin-bottom: 2em;
`
const Logo = styled(Image)`
  &&& {
    height: ${props => props.height ||  '5em'};
    text-align: center;
    vertical-align: middle;
    display: inline-block;
    margin: 0 0.5rem;
    transform: scale(1);
    transition: transform ${2/7}s;
    &:hover {
      box-shadow: none;
      transform: scale(1.05);
    }
  }
`


class CompanyLogos extends React.Component {
  render () {
    return <Logos>
      <a href='https://cryptojobslist.com/blockchain-companies/ethereum-foundation' target='_blank'>
        <Logo src='https://res.cloudinary.com/cryptojobslist/image/fetch/w_300,h_300,c_pad,b_white,q_auto,fl_lossy,f_auto/dpr_2.0/https://pbs.twimg.com/profile_images/626149701189042177/LWpxKEv3_400x400.png' />
      </a>

      <a href='https://cryptojobslist.com/blockchain-companies/consensys-diligence' target='_blank'>
        <Logo src='https://cdn-images-1.medium.com/max/1200/1*R2_D8iJhuTuUcWjLD-_WZQ.png' />
      </a>
      <a href='https://cryptojobslist.com/blockchain-companies/cryptokitties' target='_blank'>
        <Logo src='https://res.cloudinary.com/cryptojobslist/image/upload/v1525131434/hhsxyxfx5ohezjelqpbw.png' />
      </a>

      <a href='https://cryptojobslist.com/blockchain-companies/huobi' target='_blank'>
        <Logo height='8em' src='https://res.cloudinary.com/cryptojobslist/image/upload/v1521089072/pahet0u1rsleoufci7bp.jpg' />
      </a>
      <a href='https://cryptojobslist.com/blockchain-companies/circle' target='_blank'>
        <Logo src='https://res.cloudinary.com/cryptojobslist/image/fetch/w_200,h_200,c_pad,b_white,q_auto,fl_lossy,f_auto/dpr_2.0/https://res.cloudinary.com/cryptojobslist/image/upload/v1518712898/pu0he4yinavmpfklfqjp.png' />
      </a>
      <a href='https://cryptojobslist.com/blockchain-companies/tierion' target='_blank'>
        <Logo height='7em' src='https://res.cloudinary.com/cryptojobslist/image/fetch/w_300,h_300,c_pad,b_white,q_auto,fl_lossy,f_auto/dpr_2.0/http://content.tierion.com/images/500.png' />
      </a>
      <a href='https://cryptojobslist.com/blockchain-companies/okex' target='_blank'>
        <Logo height='4em' src='https://res.cloudinary.com/cryptojobslist/image/upload/v1528861198/giismmewhskvs3ebsj9y.png' />
      </a>
      <a href='https://cryptojobslist.com/blockchain-companies/parity-technologies' target='_blank'>
        <Logo src='https://res.cloudinary.com/cryptojobslist/image/fetch/w_300,h_300,c_pad,b_white,q_auto,fl_lossy,f_auto/dpr_2.0/https://pbs.twimg.com/profile_images/914160567044247552/8xODDpm1_400x400.jpg' />
      </a>
      <p>
        and <b><a href='https://cryptojobslist.com/blockchain-companies' target='_blank'>many more</a></b> …
      </p>
    </Logos>
  }
}

export default CompanyLogos
