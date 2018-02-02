import './Testimonials.styl'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import React from 'react';
import { Image, Icon, Rating } from 'semantic-ui-react'
import Slider from 'react-slick'


class Testimonials extends React.Component {
  constructor (props) {
    super(props);
  }

  settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  }

  render () {
    return <Slider {...this.settings} className='testimonials'>
      <div>
        <Icon name='quote left' color='grey' size='large' />
        <p className='quote'>
          We <a href='https://cryptojobslist.com/jobs/marketing-social-media-intern-at-adel-96qhddh3h' target='_blank'>posted</a> on <b>Crypto Jobs List</b> looking for <b>marketing interns</b> to help us with community engagement, digital marketing and social media and <b>found not one, but two highly qualified candidates</b> within days. We interviewed and hired them within three weeks. Crypto Jobs List is lightning fast, highly responsive and provides a fantastic resource for organizations looking to hire, and hire fast in the blockchain space. We will definitely use Crypto Jobs List in the future when looking to add excellent resources and personnel to our team.
        </p>
        <div className='author'>
          <a href='https://twitter.com/adelphoi_io' target='_blank'>
            <Image centered circular size='tiny' src='https://res.cloudinary.com/cryptojobslist/image/fetch/g_face,c_thumb,w_90,h_90,e_improve,q_auto,fl_lossy,f_auto/dpr_2.0/https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/000/11d/30f/0d0fa01.jpg' />
          </a>
          <p>
            <b><a href='https://twitter.com/adelphoi_io' target='_blank'>Jessica Zartler</a></b><br/>
            Marketing & Communications Director, <a href="https://adelphoi.io/" target='_blank'>Adel</a>
            <br/>
            <Rating maxRating={5} defaultRating={5} icon='star' size='tiny' disabled/><br/>
          </p>
        </div>
      </div>
      <div>
        <Icon name='quote left' color='grey' size='large' />
        <p className='quote'>
          Let me give you my feedback. I think it would be useful to you. Your site drives <b>more qualified leads than AngelList</b>. At least for the <a href='https://cryptojobslist.com/jobs/community-social-media-manager-at-kleros-bp3qjwbi8' target='_blank'>position I’m looking to cover</a>. I received in total more than 35 applications. Only 15 passed the first filter. Of those, mostly candidates from your site. Only 2 are qualified after the 3rd filter. We are interviewing now. If the candidate is a lead from your site I’ll let you know.
          <br/>
          Thanks for the follow up! Next position I’ll repeat with you.
        </p>
        <div className='author'>
          <a href='https://twitter.com/kleros_io' target='_blank'>
            <Image centered circular size='tiny' src='https://res.cloudinary.com/cryptojobslist/image/fetch/g_face,c_thumb,w_90,h_90,e_improve,q_auto,fl_lossy,f_auto/dpr_2.0/https://res.cloudinary.com/cryptojobslist/image/upload/v1515861481/r3agu0zrctzu5mnqrhvp.jpg' />
          </a>
          <p>
            <b><a href='https://twitter.com/kleros_io' target='_blank'>Maria T. Vidal</a></b><br/>
            Communications Lead, <a href="https://kleros.io/" target='_blank'>Kleros</a>
            <br/>
            <Rating maxRating={5} defaultRating={5} icon='star' size='tiny' disabled/><br/>
          </p>
        </div>
      </div>
    </Slider>
  }
}

export default Testimonials;
