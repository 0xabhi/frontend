import React from 'react'
import { observer, inject } from 'mobx-react'
import { Image, Popup } from 'semantic-ui-react'
import styled from 'styled-components'

const Logos = styled.div`
  display: block;
  text-align: center;
  margin: 0 -25vw;
  margin-bottom: 2em;
  @media (max-width: 750px) {
    margin: 0 -1em 1em;
  }
`

const LogoStyled = styled(Image)`
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
    @media (max-width: 750px) {
      width: 8.5vw;
      height: auto;
      margin-bottom: 1em;
    }
  }
`

const Logo = ({ link, companyName, logo, verticalOffset, ...rest }) => {
  return <a href={link} target='_blank'>
    <Popup content={companyName} trigger={<LogoStyled src={logo} {...rest} />} position='top center' inverted {...{verticalOffset}} />
  </a>
}

@inject('StatsStore')
class CompanyLogos extends React.Component {
  render () {
    const { companies, jobApplications, jobs } = this.props.StatsStore
    return <Logos>
      <Logo
        companyName='Ethereum Foundation'
        link='https://cryptojobslist.com/blockchain-companies/ethereum-foundation'
        logo='https://res.cloudinary.com/cryptojobslist/image/fetch/w_300,h_300,c_pad,b_white,q_auto,fl_lossy,f_auto/dpr_2.0/https://pbs.twimg.com/profile_images/626149701189042177/LWpxKEv3_400x400.png'
      />

      <Logo
        companyName='ConsenSys Diligence'
        link='https://cryptojobslist.com/blockchain-companies/consensys-diligence'
        logo='https://cdn-images-1.medium.com/max/1200/1*R2_D8iJhuTuUcWjLD-_WZQ.png'
      />

      <Logo
        companyName='CryptoKitties'
        link='https://cryptojobslist.com/blockchain-companies/cryptokitties'
        logo='https://res.cloudinary.com/cryptojobslist/image/upload/v1525131434/hhsxyxfx5ohezjelqpbw.png'
      />

      <Logo
        companyName='Huobi'
        link='https://cryptojobslist.com/blockchain-companies/huobi'
        logo='https://res.cloudinary.com/cryptojobslist/image/upload/c_thumb,z_3/v1521089072/pahet0u1rsleoufci7bp.jpg'
        height='8em'
        verticalOffset={50}
      />

      <Logo
        companyName='Circle'
        link='https://cryptojobslist.com/blockchain-companies/circle'
        logo='https://res.cloudinary.com/cryptojobslist/image/upload/v1518712898/pu0he4yinavmpfklfqjp.png'
      />

      <Logo
        companyName='Tierion'
        link='https://cryptojobslist.com/blockchain-companies/tierion'
        logo='http://content.tierion.com/images/500.png'
        height='7em'
      />

      <Logo
        companyName='OKEx'
        link='https://cryptojobslist.com/blockchain-companies/okex'
        logo='https://res.cloudinary.com/cryptojobslist/image/upload/v1528861198/giismmewhskvs3ebsj9y.png'
      />

      <Logo
        companyName='Parity Technologies'
        link='https://cryptojobslist.com/blockchain-companies/parity-technologies'
        logo='https://res.cloudinary.com/cryptojobslist/image/fetch/w_300,h_300,c_pad,b_white,q_auto,fl_lossy,f_auto/dpr_2.0/https://pbs.twimg.com/profile_images/914160567044247552/8xODDpm1_400x400.jpg'
      />

      <p>
        … and <b><a href='https://cryptojobslist.com/blockchain-companies' target='_blank'>
        {companies ?
          `${companies-7} companies more`
          : 'many more'
        }
        </a></b>.
        {companies ? <span><br/> Here are some more open stats:</span> : null }
      </p>
    </Logos>
  }
}

export default CompanyLogos
