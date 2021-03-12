import React, { useState } from 'react'
import './infoCoach.scss'
import { Rate } from 'antd';
import { AVATAR } from '../../constants'

export default function InfoCoach({ coachcalander, coachProfile, key, job, specialty }) {
    const [img, setImg] = useState(coachProfile.profilePicture ?
        "http://isporit.com/api/" + coachProfile.profilePicture :
        AVATAR)

    const [sum, setSum] = useState(Math.round((coachProfile.map(coach => coach.coachData.reviews.reduce((a, v) => a = a + v.rating, 0) / coach.coachData.reviews.length))))

    return (
        coachProfile &&
            coachProfile.map((coach) =>
           
                <div className={coachcalander ? "coachcalander" : "infocoach"}>
                    <div className="infocoach__firstblock">
{                    console.log("coach",specialty)
}                        <img className={"infocoach__img"} src={img} alt="" />
                        <div className={"card_profil_coach__information__name"} >
                            {coach.firstName + coach.lastName}
                        </div>

                        <div className={"card_profil_coach__information__rate"}>
                            <Rate disabled defaultValue={sum}
                                className={"rate"} />

                        </div>
                    </div>
                    <div className="infocoach__secondblock">
                        <div className={"card_profil_coach__information__worktype"}>
                            {job.translations.fr}
                        </div>
                        <div className={"card_profil_coach__information__sporttype"}>
                            {specialty && specialty.translations ? specialty.translations.fr :""}
                        </div>
                        <div className={"card_profil_coach__information__yearexperience"}>
                            {coach && coach.coachData && coach.coachData.experiencesYearsNumber == 1 ?
                                (coach.coachData.experiencesYearsNumber + " an d'expérience") :
                                coach.coachData.experiencesYearsNumber + " ans d'expérience"
                            }
                        </div>
                        <div className={"suggestcoachdetails"}>
                            <div className={"suggestcoachdetails__suggestPrivateCourse"}>
                                <img className={"suggestcoachdetails__suggestPrivateCourse__img"} src="../icon/cercle.png"
                                    alt=""></img>
                                <div className={"suggestcoachdetails__suggestPrivateCourse__propose"}>Propose de cours privé </div>
                            </div>
                            <button className={"buttoncontactcoach"}>contacter</button>

                        </div>
                    </div>
                </div>
            ) 
    )
}
