"use client";

import { useState } from "react";

export default function TeamPage() {
    const [name, setName] = useState('');
    const [names, setNames] = useState([]);
    const [teamName, setTeamName] = useState('');
    const [teamNames, setTeamNames] = useState([]);

    const joinReady = new Array();


    //입력한 사람을 팀에 추가
    function joinTeam() {
        setNames(names.concat(name));
        setName('');
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


    return (
        <>
            <div className="vertical-align">
                <div className="horizontal-align inline-elements spread-elements padT0">
                    <div className="vertical-align padT0" style={{ width: "800px" }}>
                        <div className="inline-elements padB0 padT0">
                            <input className="form-control" type="text" placeholder="팀원 이름 입력" value={name} onChange={(e) => setName(e.target.value)} onKeyUp={(e) => e.key === 'Enter' ? joinTeam() : false}></input>
                            <button className="btn btn-sm btn-outline-secondary marL10" onClick={joinTeam}>추가</button>
                        </div>
                        <div className="horizontal-align-lg">
                            {names.map((name, index) => (
                                <div className="card center-align" style={{ padding: "5px", margin: "0px", minWidth: "80px" }} key={index}>{name}</div>
                            ))}
                        </div>

                    </div>
                    <div className="vertical-align padT0 fill-parent">
                        <button className="btn btn-primary f24">Suffle</button>
                    </div>
                    <div className="vertical-align padT0 fill-parent">
                        <div className="inline-elements padB0 padT0">
                            <input className="form-control" type="text" placeholder="팀 이름 입력" value={teamName} onChange={(e) => setTeamName(e.target.value)} onKeyUp={(e) => e.key === 'Enter' ? addTeam() : false}></input>
                            <button className="btn btn-sm btn-dark marL10" onClick={addTeam}>팀 추가</button>
                        </div>
                        <div className="inline-elements">
                            {teamNames.map((name, index) => (
                                <div className="vertical-align padT0 padL5 padR0" key={index}>
                                    <div className="card" style={{ padding: "5px", margin: "0px", width: "100%" }}>{name}</div>
                                    <div className="card" style={{ padding: "5px", margin: "0px", width: "200px", height: "300px" }}>{name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}