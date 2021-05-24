import React, { useEffect, useState } from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { Button } from '../../components/button';
import { useQuery } from '@apollo/client';
import { Me } from '../../types/Me';

const ME = gql`
    query Me {
        loggedinUser {
            id
            email
            nickname
            role
            verified
            birthday
            phoneNumber
            profileImg
            gender
        }
    }
`;

export const Mypage = () => {
    const { data: userData }  = useQuery<Me>(ME);
    const [date, setDate] = useState("");

    useEffect(() => {
        setDate(userData?.loggedinUser.birthday.substring(0, 10).replaceAll('-', '/'));
    }, [userData?.loggedinUser.birthday]);

    return (
        <div className="container">
            <h4 className="title mt-6">Mypage</h4>
            <div className="flex flex-col justify-center items-center w-full text-xl">
                <div className="flex">
                    <div>{userData?.loggedinUser.profileImg}사진사진</div>
                    <div className="font-semibold text-2xl">{userData?.loggedinUser.nickname}</div>
                </div>
                <div className="flex justify-between items-center w-1/2 mb-2">
                    <div>이메일</div>
                    <div>{userData?.loggedinUser.email}</div>
                </div>
                <div className="flex justify-between items-center w-1/2 mb-2">
                    <div>이메일 인증</div>
                    {userData?.loggedinUser.verified ? <div className="text-green-700">인증됨</div> : <div className="text-red-700">인증 필요</div>}
                </div>
                <div className="flex justify-between items-center w-1/2 mb-2">
                    <div>성별</div>
                    <div>{userData?.loggedinUser.gender}</div>
                </div>
                <div className="flex justify-between items-center w-1/2 mb-2">
                    <div>전화번호</div>
                    <div>{userData?.loggedinUser.phoneNumber}</div>
                </div>
                <div className="flex justify-between items-center w-1/2 mb-2">
                    <div>생일</div>
                    <div>{date}</div>
                </div>
                <div className="flex justify-between items-center w-1/2 mb-2">
                    <div>role</div>
                    <div>{userData?.loggedinUser.role}</div>
                </div>
                <Link to="/mypage/edit">
                    <Button loading={false} canClick={true} actionText="프로필 수정하기" />
                </Link>
            </div>
        </div>
    );
};
