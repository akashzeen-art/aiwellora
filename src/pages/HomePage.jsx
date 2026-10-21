import { Link } from 'react-router-dom'
import heroImg from '../assets/hero.png'
import lifestyleImg from '../assets/lifestyle.png'
import healthImg from '../assets/health.png'
import relaxationImg from '../assets/relaxation.png'
import swearlImg from '../assets/swearl.png'
import grayImg from '../assets/gray.png'
import lifestyleIcon from '../assets/lifestyle_icon.png'
import healthIcon from '../assets/health_icon.png'
import relaxationIcon from '../assets/relaxation_icon.png'
import { useLanguage } from '../i18n/LanguageContext'
import './HomePage.css'

export default function HomePage() {
  const { t } = useLanguage()

  const scrollToLifestyle = () => {
    document.getElementById('lifestyle')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="home hero">
      <div className="home-hero-wrap">
        <div className="container home-hero-container">
          <div className="circle" aria-hidden="true" />
          <div className="content">
            <div className="header title home-hero-title">{t('home.heroTitle')}</div>
            <button
              type="button"
              className="more_button home-hero-cta mx-auto start"
              onClick={scrollToLifestyle}
            >
              {t('home.startHere')}
            </button>
            <div className="image-container home-hero-image">
              <img src={heroImg} alt={t('home.heroAlt')} width="90%" />
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid relative index5 home-section px-0 mx-0 first" id="lifestyle">
        <div className="circle_2" aria-hidden="true" />
        <img className="swearl" src={swearlImg} alt="" width="90%" aria-hidden="true" />

        <div className="container relative index-2">
          <div className="row g-5 home-section-row align-items-center">
            <div className="col-12 col-md-6 ps-3">
              <img
                className="category-images"
                src={lifestyleImg}
                alt={t('home.lifestyleTitle')}
                width="100%"
              />
            </div>
            <div className="col-12 col-md-6 ps-3 px-lg-5">
              <div
                className="icon-category lifestyle_icon"
                style={{ backgroundImage: `url(${lifestyleIcon})` }}
              />
              <div className="title home-section-title">{t('home.lifestyleTitle')}</div>
              <div className="basic_text home-section-text">{t('home.lifestyleBody')}</div>
            </div>
            <div className="col-12 mx-auto home-section-cta">
              <Link to="/lifestyle" className="moreButton">
                {t('home.more')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid relative index5 home-section px-0 mx-0 second" id="health">
        <div className="circle_3" aria-hidden="true" />
        <img className="gray" src={grayImg} alt="" width="90%" aria-hidden="true" />

        <div className="container relative index-2">
          <div className="row g-5 home-section-row align-items-center">
            <div className="col-12 col-md-6 ps-3">
              <img
                className="category-images"
                src={healthImg}
                alt={t('home.healthTitle')}
                width="100%"
              />
            </div>
            <div className="col-12 col-md-6 ps-3 px-lg-5">
              <div
                className="icon-category health_icon"
                style={{ backgroundImage: `url(${healthIcon})` }}
              />
              <div className="title home-section-title">{t('home.healthTitle')}</div>
              <div className="basic_text home-section-text">{t('home.healthBody')}</div>
            </div>
            <div className="col-12 mx-auto home-section-cta">
              <Link to="/health" className="moreButton">
                {t('home.more')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid relative index5 home-section px-0 mx-0 third">
        <div className="container">
          <div className="row g-5 home-section-row align-items-center">
            <div className="col-12 col-md-6 ps-3">
              <img
                className="category-images"
                src={relaxationImg}
                alt={t('home.relaxationTitle')}
                width="100%"
              />
            </div>
            <div className="col-12 col-md-6 ps-3 px-lg-5">
              <div
                className="icon-category relaxation_icon"
                style={{ backgroundImage: `url(${relaxationIcon})` }}
              />
              <div className="title home-section-title">{t('home.relaxationTitle')}</div>
              <div className="basic_text home-section-text">{t('home.relaxationBody')}</div>
            </div>
            <div className="col-12 mx-auto home-section-cta">
              <Link to="/relaxation" className="moreButton">
                {t('home.more')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
