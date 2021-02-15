import React, { useState, useEffect } from 'react'
import HeaderCoachProfile from '../shared/components/HeaderCoachProfile/HeaderCoachProfil'
import css from '../shared/css/profilecoach.scss'
import globalCss from '../shared/global-style.scss'
import fetch from 'isomorphic-unfetch'
import { ALL, ALPHABETICAL, RECOMMEND, EXPERIENCE, API } from '../shared/constants'
import { Input, Select, Modal, Button } from 'antd';
import FilterCoach from '../shared/components/FilterCoach/FilterCoach';
import Experiencefilter from '../shared/components/Experiencefilter/Experiencefilter';
import Recommendation from '../shared/components/RecommendationFilter/Recommendation';
import CoachType from '../shared/components/CoachTypeFilter/CoachType';
import CoachRegion from '../shared/components/CoachRegionFilter/CoachRegion';
import CardProfileCoach from '../shared/components/CardProfileCoachFilter/CardProfileCoach';
import Navbar from '../shared/components/navbar/Navbar';

export default function ProfileCoach({ coachesList, jobs, sports, dances, regions }) {
    const [dataCopy, setDataCopy] = useState(coachesList)
    const [coachSpecialty, setCoachSpecialty] = useState()
    const [coachSpecialtyFilter, setCoachSpecialtyFilter] = useState('')
    const nbr_of_card_per_page = 2

    const [state, setState] = useState(Array.from(dataCopy))
    const [pageNumber, setPageNumber] = useState(1)
    const [pageActiveNumber, setPageActiveNumber] = useState()
    function paginate(array, page_size, page_number) {
        // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
        return array.slice((page_number - 1) * page_size, page_number * page_size);
    }
    const { Search } = Input;
    const renderCoachProfile = (coachProfile) => {
        const job = jobs.find(job => job._id === coachProfile.coachData.job)
        let specialty = ""
        if (job.specialty && job.specialty.type === "sport") {

            specialty = sports.find(sport => sport._id === coachProfile.coachData.specialty)
        }
        else if (job.specialty && job.specialty.type === "dance") {

            specialty = dances.find(dance => dance._id === coachProfile.coachData.specialty)
        }
        return <CardProfileCoach
            coachProfile={coachProfile}
            key={coachProfile._id}
            job={job}
            specialty={specialty}
        />
    }
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onSearch = value => {
        setDataCopy(dataCopy.filter(e => e.firstName.includes(value) || e.lastName.includes(value)))
    };
    const { Option } = Select;
    const handleChange = (value) => {
        if (value.key == 'alphabetique') {
            const sortbyalphabetical = ([...dataCopy].sort((a, b) => a.firstName - b.firstName ? 1 : -1))
            return setDataCopy(sortbyalphabetical)
        }

        if (value.key == 'Tout') {
            return setDataCopy(coachesList)
        }
        if (value.key == 'experience') {
            const sortbyexperience = ([...dataCopy].sort((a, b) => a.coachData.experiencesYearsNumber < b.coachData.experiencesYearsNumber ? 1 : -1))
            return setDataCopy(sortbyexperience)
        }
        if (value.key == 'recommander') {

            const sortbyrecommend = ([...coachesList].sort((a, b) =>
                (Math.round(a.coachData.reviews.reduce((a, v) => a = a + v.rating, 0) / a.coachData.reviews.length) <
                    Math.round(b.coachData.reviews.reduce((a, v) => a = a + v.rating, 0) / b.coachData.reviews.length)) ? 1 : -1))
            return setDataCopy(sortbyrecommend)
        }

    }

    return (
        <>
            <Navbar />

            <div className={css.profil_coach}>

                <div className={css.affiche}>
                    <img className={css.affiche__img} src={"../../../icon/profil_coach.png"} alt="" />
                </div>
                <div className={css.profil_coach__coach_details} >
                    <div className={css.profil_coach__coach_details__filter} >
                        <Search className={css.profil_coach__coach_details__filter__input_searsh}
                            placeholder="RECHERCHE PAR NOM"
                            onChange={e => onSearch(e.target.value)}
                            style={{
                                width: 270,
                            }} />

                        <div className={css.line}></div>

                        <FilterCoach
                            coachSpecialty={coachSpecialty}
                            setCoachSpecialty={setCoachSpecialty}
                            setCoachSpecialtyFilter={setCoachSpecialtyFilter}
                            coachSpecialtyFilter={coachSpecialtyFilter}
                            dances={dances}
                            sports={sports}
                            title={"PROFESSIONS"}
                            jobs={jobs}
                            setDataCopy={setDataCopy}
                            dataCopy={dataCopy}
                            coachesList={coachesList}
                        />
                        <div className={css.line}></div>
                        <FilterCoach
                            dances={dances}
                            sports={sports}
                            setDataCopy={setDataCopy}
                            dataCopy={dataCopy}
                            coachesList={coachesList}
                            coachSpecialty={coachSpecialty}
                            setCoachSpecialty={setCoachSpecialty}
                            setCoachSpecialtyFilter={setCoachSpecialtyFilter}
                            coachSpecialtyFilter={coachSpecialtyFilter}
                            jobs={jobs}
                            title={"SPECIALITES"}
                        />
                        <div className={css.line}></div>
                        <Experiencefilter setDataCopy={setDataCopy} dataCopy={dataCopy} coachesList={coachesList} />
                        <div className={css.line}></div>
                        <Recommendation dataCopy={dataCopy} setDataCopy={setDataCopy} coachesList={coachesList} />
                        <div className={css.line}></div>
                        <CoachType setDataCopy={setDataCopy} dataCopy={dataCopy} coachesList={coachesList} />
                        <div className={css.line}></div>
                        <CoachRegion regions={regions} setDataCopy={setDataCopy} dataCopy={dataCopy} coachesList={coachesList} />
                    </div>

                    <div className={css.profil_coach__coach_details__list_of_coach}>
                        <Search className={css.profil_coach__coach_details__filter__input_searshmobile}
                            placeholder="RECHERCHE PAR NOM"
                            onChange={e => onSearch(e.target.value)}
                            style={{
                                width: 270,
                            }} />
                        <div className={css.profil_coach__coach_details__list_of_coach__lenght_sortby}>
                            <div className={css.profil_coach__coach_details__list_of_coach__lenght_sortby__filter}>
                                <Button className={css.buttonfilter} type="primary" onClick={showModal}>
                                    Filter
                        </Button>
                                <Modal title="Filter" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                    <FilterCoach
                                        coachSpecialty={coachSpecialty}
                                        setCoachSpecialty={setCoachSpecialty}
                                        setCoachSpecialtyFilter={setCoachSpecialtyFilter}
                                        coachSpecialtyFilter={coachSpecialtyFilter}
                                        dances={dances}
                                        sports={sports}
                                        title={"PROFESSIONS"}
                                        jobs={jobs}
                                        setDataCopy={setDataCopy}
                                        dataCopy={dataCopy}
                                        coachesList={coachesList}
                                    />
                                    <FilterCoach
                                        dances={dances}
                                        sports={sports}
                                        setDataCopy={setDataCopy}
                                        dataCopy={dataCopy}
                                        coachesList={coachesList}
                                        coachSpecialty={coachSpecialty}
                                        setCoachSpecialty={setCoachSpecialty}
                                        setCoachSpecialtyFilter={setCoachSpecialtyFilter}
                                        coachSpecialtyFilter={coachSpecialtyFilter}
                                        jobs={jobs}
                                        title={"SPECIALITES"}
                                    />
                                    <div className={css.line}></div>
                                    <Experiencefilter setDataCopy={setDataCopy} dataCopy={dataCopy} coachesList={coachesList} />
                                    <div className={css.line}></div>
                                    <Recommendation dataCopy={dataCopy} setDataCopy={setDataCopy} coachesList={coachesList} />
                                    <div className={css.line}></div>
                                    <CoachType setDataCopy={setDataCopy} dataCopy={dataCopy} coachesList={coachesList} />
                                    <div className={css.line}></div>
                                    <CoachRegion regions={regions} setDataCopy={setDataCopy} dataCopy={dataCopy} coachesList={coachesList} />
                                </Modal>
                            </div>
                            <div className={css.profil_coach__coach_details__list_of_coach__lenght_sortby__lenght}>
                                {dataCopy.length} résultat(s)
                        </div>
                            <div className={css.profil_coach__coach_details__list_of_coach__lenght_sortby__sortby}>
                                <span>Trier par : </span>
                                <Select
                                    labelInValue
                                    placeholder={ALL}
                                    style={{ width: 155 }}
                                    bordered={false}
                                    className={css.profil_coach__coach_details__list_of_coach__lenght_sortby__sortby__select}
                                    onChange={handleChange}
                                >
                                    <Option value={ALL} >Tout</Option>
                                    <Option value={ALPHABETICAL}>Ordre alphabétique</Option>
                                    <Option value={RECOMMEND}>Les plus recommandés</Option>
                                    <Option value={EXPERIENCE}>Années d'expérience</Option>
                                </Select>
                            </div>

                        </div>
                        <div className={css.line}></div>
                        <div className={css.profil_coach__coach_details__list_of_coach__card}>
                            {paginate(state, nbr_of_card_per_page, pageNumber).map((coachProfile, key) =>
                                renderCoachProfile(coachProfile)
                            )}
                        </div>
                        <div className={css.paginate}>
                            {
                                Array.from({ length:Math.round(state.length / nbr_of_card_per_page )}).map((el, index) => (
                                    <div className={pageActiveNumber == index  || index+1 ==pageNumber? css.paginate__page : ""}
                                      key={index} type="submit" onClick={() => {setPageNumber(index + 1),setPageActiveNumber(index)}}>
                                        {index + 1}
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
ProfileCoach.getInitialProps = async () => {
    const coachesRes = await fetch(API + "users/coaches/all")
    const jobsRes = await fetch(API + "jobs")
    const sportsRes = await fetch(API + "sports")
    const danceRes = await fetch(API + "dances/")
    const regionsRes = await fetch(API + "regions/")
    const jsonCoachesRes = await coachesRes.json()
    const jsonJobsRes = await jobsRes.json()
    const jsonSportsRes = await sportsRes.json()
    const jsonDancesRes = await danceRes.json()
    const jsonRegionsRes = await regionsRes.json()

    return {
        coachesList: jsonCoachesRes,
        jobs: jsonJobsRes,
        sports: jsonSportsRes,
        dances: jsonDancesRes,
        regions: jsonRegionsRes
    }
}


