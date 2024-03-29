"use client";

import { useState } from "react";

export default function TeamPage() {
    const [name, setName] = useState('');
    const [names, setNames] = useState([]);
    const [teamName, setTeamName] = useState('');
    const [teamNames, setTeamNames] = useState([]);
    const [shuffleTeams, setShuffleTeams] = useState({});
    const [userInfo, setUserInfo] = useState([]);
    const joinReady = new Array();
    
    const res = fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {cache:'no-store'})
    .then(res => res.json()).then(data => setUserInfo(data));
    // const data = ;


    //입력한 사람을 팀에 추가
    function joinTeam() {
        setNames(names.concat(name));
        setName('');
        updateInfo();
        
    }

     //수정완료 버튼 클릭시
     function updateInfo() {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
            method: 'POST', // PUT은 넘기지 않은 데이터는 NULL로 UPDATE (전체 수정), PATCH는 넘긴 데이터만 UPDATE (일부 수정)
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                // team: content
            })
        }).then((res) => {
            if (res.ok) {
                return res.json(); //res.json()은 비동기 처리임. Promise 객체를 반환한다. 
            }
        }).then((data) => { //res.json()이 Promise이기때문에 한번 더 .then을 호출하여야 함
            // if (data) {
            //     router.push(`/diary/read/${data.id}`);
            //     router.refresh();
            // }
        }).catch((err) => {
            console.log(err);
        })
    }

    //해당 사람을 팀에서 꺼냄
    function popTeam() {

    }

    //팀 그룹을 추가
    function addTeam() {
        if (teamNames.length === 5) {
            alert("팀은 최대 5개까지 추가 가능합니다.");
            return false;
        } else {
            if(teamName) {
                setTeamNames(teamNames.concat(teamName));
                setTeamName('');
            } else {
                alert("팀 이름을 입력해주세요");
                return false;
            }
        }
    }

    //팀 그룹을 삭제
    function removeTeam() {

    }

    //셔플
    function shuffle() {
        if(teamNames.length > 1 && names.length > teamNames.length) {
            const shuffleNames = names.slice();
            for(let index = shuffleNames.length-1; index > 0; index--) {
                const randomPosition = Math.floor(Math.random()*(index+1));
    
                const temp = shuffleNames[index];
                shuffleNames[index] = shuffleNames[randomPosition];
                shuffleNames[randomPosition] = temp;
            }
                    
            const quotient  = parseInt(shuffleNames.length/teamNames.length); 
            
            const teamMap = {};
            teamNames.forEach((teamName) => {
                teamMap[teamName] = new Array();
            });
            
            const aleadyHaveTeam = new Array();
            const fullTeam = new Array();
            teamNames.forEach((readyTeamName, indexA) => {
                shuffleNames.forEach((readyName, indexB) => {
                    if(parseInt((indexB+1)/quotient) === indexA) {
                        teamMap[readyTeamName].push(readyName);
                        aleadyHaveTeam.push(readyName);
                    }
                    if(parseInt((indexB+1)/quotient) === quotient && fullTeam.indexOf(readyTeamName) == -1 && aleadyHaveTeam.indexOf(readyName) == -1) {
                        teamMap[readyTeamName].push(readyName);
                        fullTeam.push(readyTeamName);
                        aleadyHaveTeam.push(readyName);
                    }
                });
            });

            setShuffleTeams(teamMap);
            // debugger;
            // shuffleNames.forEach((readyTeamName, indexA) => {
            //     let tgtTeamLength = 0;
            //     let stdLength = 0;
            //     teamMap.forEach((postTeamMap, indexB) => {
            //         if (indexB == 0) {
            //             stdLength = postTeamMap.length
            //         } 
                    
            //         if (stdLength == postTeamMap.length) {
            //             tgtTeamLength
            //         }
            //     })
            // });
        } else {
            if(teamNames.length < 2) {
                alert("팀이 2개 미만일 수 없습니다.");
            } else if(names.length <= teamNames.length) {
                alert("팀원에 비해 팀이 너무 많습니다.\n최소 팀 갯수보다 팀원의 수가 많아야 합니다.");
            }
            
            return false;
        }
    }

    useState(()=> {

    },[names]);


    return (
        <>
            <div className="vertical-align">
                <div className="horizontal-align inline-elements spread-elements padT0">
                    <div className="vertical-align padT0" style={{ width: "800px" }}>
                        <div className="inline-elements padB0 padT0">
                            <input className="form-control" type="text" placeholder="팀원 이름 입력" name="name" value={name} onChange={(e) => setName(e.target.value)} onKeyUp={(e) => e.key === 'Enter' ? joinTeam() : false}></input>
                            <button className="btn btn-sm btn-outline-secondary marL10" onClick={joinTeam}>추가</button>
                        </div>
                        <div className="horizontal-align-lg">
                            {/* {names.map((name, index) => (
                                <div className="card center-align" style={{ padding: "5px", margin: "0px", minWidth: "80px" }} key={index}>{name}</div>
                            ))} */}
                            {userInfo.map((users, index) => (
                                <div className="card center-align" style={{ padding: "5px", margin: "0px", minWidth: "80px" }} key={index}>{users.name}</div>
                            ))}
                        </div>

                    </div>
                    <div className="vertical-align padT0 fill-parent">
                        <button className="btn btn-primary f24" onClick={shuffle}>Suffle</button>
                    </div>
                    <div className="vertical-align padT0 fill-parent">
                        <div className="inline-elements padB0 padT0">
                            <input className="form-control" type="text" placeholder="팀 이름 입력" value={teamName} onChange={(e) => setTeamName(e.target.value)} onKeyUp={(e) => e.key === 'Enter' ? addTeam() : false}></input>
                            <button className="btn btn-sm btn-dark marL10" onClick={addTeam}>팀 추가</button>
                        </div>
                        <div className="inline-elements">
                            {teamNames.map((name, index) => 
                                <div className="vertical-align padT0 padL5 padR0" key={index}>
                                    <div className="card" style={{ padding: "5px", margin: "0px", width: "100%" }}>{name}</div>
                                    <div className="card" style={{ padding: "5px", margin: "0px", width: "200px", height: "300px" }}>
                                        {shuffleTeams[name] ? (shuffleTeams[name].join(' ,')) : '아직 팀원이 없습니다.'}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}