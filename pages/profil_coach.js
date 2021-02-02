import React,{useState,useEffect} from 'react'
import Header_coach_profil from '../shared/components/header_coach_profi/Header_coach_profil'
import css from '../shared/css/profil_coach.scss'
import globalCss from '../shared/global-style.scss'
import fetch from 'isomorphic-unfetch'

import { Input ,Select} from 'antd';
import Filter_coach from '../shared/components/filter_coach/Filter_coach';
import Experience from '../shared/components/experience/Experience';
import Recommendation from '../shared/components/recommendation/recommendation';
import Coach_type from '../shared/components/coach_type/Coach_type';
import Coach_region from '../shared/components/coach_region/Coach_region';
import Card_profil_coach from '../shared/components/card_profil_coach/Card_profil_coach';
export default function profil_coach({coachlist,jobs,sports,dances}) {
    const [dataCopy, setdataCopy] = useState(coachlist)
    const [coachSpecialty, setcoachSpecialty] = useState()
    const [coachSpecialtyfilter, setcoachSpecialtyfilter] = useState('')
    const { Search } = Input;

    const onSearch = value =>  {
        setdataCopy(coachlist.filter(e => e.firstName.includes(value) || e.lastName.includes(value))) 
       };
        const { Option } = Select;
        const handleChange=(value)=> {
            if(value.key=='alphabetique'){
              const sortbyalphabetical=([...coachlist].sort( (a, b) => a.firstName - b.firstName? 1 : -1 ))
               return setdataCopy(sortbyalphabetical)
              }

            if(value.key=='Tout'){
                 return setdataCopy(coachlist)
                }
            if(value.key=='experience'){
                const sortbyexperience=([...coachlist].sort( (a, b) => a.coachData.experiencesYearsNumber < b.coachData.experiencesYearsNumber ? 1 : -1 ))
                 return setdataCopy(sortbyexperience)
            } 
            if(value.key=='recommander'){

                 const sortbyrecommend=([...coachlist].sort( (a, b) => 
                 (Math.round(a.coachData.reviews.reduce((a,v) =>  a = a + v.rating , 0 )/a.coachData.reviews.length) < 
                 Math.round(b.coachData.reviews.reduce((a,v) =>  a = a + v.rating , 0 )/b.coachData.reviews.length))? 1 : -1 ))
                    return setdataCopy(sortbyrecommend)
            }

          }
       
    return (
        <div className={css.profil_coach}>
            <Header_coach_profil /> 
           
            <div className={css.affiche}>
                <img className={css.affiche__img} src={"icon/profil_coach.png"} alt="" />
            </div>
            <div className={css.profil_coach__coach_details} >
                <div className={css.profil_coach__coach_details__filter} >
                    <Search className={css.profil_coach__coach_details__filter__input_searsh} placeholder="RECHERCHE PAR NOM" 
                     onChange={e=>onSearch(e.target.value)}
                     style={{ width: 160,
                             }} />

                    <Filter_coach 
                     coachSpecialty={coachSpecialty}
                     setcoachSpecialty={setcoachSpecialty}
                     setcoachSpecialtyfilter={setcoachSpecialtyfilter}
                     coachSpecialtyfilter={coachSpecialtyfilter}
                     dances={dances}
                     sports={sports}
                     title={"PROFESSIONS"} 
                     titleone={"Football"} 
                     titletwo={"Tennis"} 
                     jobs={jobs}
                     setdataCopy={setdataCopy}
                     dataCopy={dataCopy}
                     coachlist={coachlist}
                     />
                    <div className={css.line}></div> 
                     <Filter_coach 
                     dances={dances}
                     sports={sports}
                     setdataCopy={setdataCopy}
                      dataCopy={dataCopy}
                      coachlist={coachlist}
                      coachSpecialty={coachSpecialty}
                      setcoachSpecialty={setcoachSpecialty}
                      setcoachSpecialtyfilter={setcoachSpecialtyfilter}
                      coachSpecialtyfilter={coachSpecialtyfilter}
                      jobs={jobs}
                      title={"SPECIALITES"} 
                      titleone={"Collectif"} 
                      titletwo={"Individuel"} 
                      titlethere={"Football"} 
                      subtitleone={"Basket-ball"} 
                      subtitletwo={"Volley-ball"} 
                      subtitlethere={"Handball"} 
                      subtitlefour={"Football"} 
                      subtitlefour={"Gymnastique"} 
                      subtitlesix={"Tennis"} 
                      subtitleseven={"Tennis"} 
                      subtitleeight={"Yoga"} 
                     />
                    <div className={css.line}></div> 
                    <Experience setdataCopy={setdataCopy} dataCopy={dataCopy} coachlist={coachlist} />
                    <div className={css.line}></div> 
                    <Recommendation dataCopy={dataCopy} setdataCopy={setdataCopy} coachlist={coachlist} />
                    <div className={css.line}></div> 
                    <Coach_type setdataCopy={setdataCopy} dataCopy={dataCopy} coachlist={coachlist} />
                    <div className={css.line}></div> 
                    <Coach_region  setdataCopy={setdataCopy} dataCopy={dataCopy} coachlist={coachlist} />
                </div>

                <div className={css.profil_coach__coach_details__list_of_coach}>
                    <div className={css.profil_coach__coach_details__list_of_coach__lenght_sortby}> 

                        <div className={css.profil_coach__coach_details__list_of_coach__lenght_sortby__lenght}> 
                            {dataCopy.length} resultat(s) 
                        </div>
                        <div  className={css.profil_coach__coach_details__list_of_coach__lenght_sortby__sortby}>
                        <span>Trier par : </span>
                        <Select
                            labelInValue
                            placeholder={"Tout"}
                            style={{ width: 155 }}
                            bordered={false}
                            className={css.profil_coach__coach_details__list_of_coach__lenght_sortby__sortby__select}
                            onChange={handleChange}
                        >
                            <Option value="Tout" >Tout</Option>
                            <Option value="alphabetique">Ordre alphabétique</Option>
                            <Option value="recommander">Plus recommander</Option>
                            <Option value="experience">Années expérience</Option>
                        </Select>
                        </div>
                        
                    </div>
                    <div className={css.line}></div> 
                    <div className={css.profil_coach__coach_details__list_of_coach__card}>
                        {dataCopy.map((coachprofil,key)=>
                        <Card_profil_coach 
                        coachprofil={coachprofil} 
                        key={coachprofil._id}
                        jobs={jobs}
                        />
                        )}
                        
                    </div>

                </div>
            </div>
        </div>
    )
}

profil_coach.getInitialProps = async () => {
    const coachres = await fetch("https://dev.isporit.com/api/users/coaches/all")
    const jobsres = await fetch("https://dev.isporit.com/api/jobs")
    const sportsres = await fetch("https://dev.isporit.com/api/sports")
    const danceres = await fetch("https://dev.isporit.com/api/dances/")



    const jsoncoach = await coachres.json()
    const jsonjobs = await jobsres.json()
    const jsonsports = await sportsres.json()
    const jsondances = await danceres.json()

    



    return {  coachlist: jsoncoach,jobs:jsonjobs ,sports:jsonsports,dances:jsondances}

}

    
    