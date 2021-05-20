import React from 'react';
import { Link } from 'react-router-dom';
import BI from '../assets/common/BI.png';
import { useLoggedInUser } from '../hooks/useLoggedInUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export const Header:React.FC = () => {
    const { data } = useLoggedInUser();
    return (
        <>
            { !data?.loggedinUser.verified && (
                <div className="p-3 text-center bg-red-500 text-white">
                    <span>이메일을 인증해주세요!</span>
                </div>
            )}
            <header className="py-4">
                <div className="container flex justify-between items-center">
                    <img src={BI} alt="BI" className="w-52 md:w-80" />
                    <span className="text-lg">
                        <Link to="/mypage">
                            <FontAwesomeIcon icon={faUser} className="text-xl" />
                            {data?.loggedinUser.nickname}
                        </Link>
                    </span>
                </div>
            </header>
        </>
    );
};
