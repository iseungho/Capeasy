import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {logout} from "../slices/loginSlice";
import {getCookie} from "../util/cookieUtil";
import {jwtDecode} from 'jwt-decode';

const COOKIE_EXPIRY_CHECK_INTERVAL = 1000 * 600; // 10분마다 만료 체크

export const useAutoLogout = () => {
    const dispatch = useDispatch();

    useEffect(() => {

        const checkJWTExpiry = () => {

            if (getCookie("member")) {
                try {
                    const { refreshToken } = getCookie("member"); // 쿠키에서 리프레시 토큰 가져오기
                    if (refreshToken) {
                        const { exp } = jwtDecode(refreshToken); // exp 필드에서 만료 시간 가져오기
                        const currentTime = Math.floor(Date.now() / 1000); // 현재 시간 (초)

                        if (exp < currentTime) { // 만료 시간이 현재 시간보다 이전이면
                            alert("장기간 입력이 없어 자동으로 로그아웃합니다.");
                            dispatch(logout()); // 로그아웃 액션 디스패치
                        }
                    }
                } catch (error) {
                    console.error("JSON 파싱 오류:", error);
                    alert("세션 정보가 만료되어 로그아웃합니다.");
                    dispatch(logout());
                }
            }
        };

        const intervalId = setInterval(checkJWTExpiry, COOKIE_EXPIRY_CHECK_INTERVAL);

        return () => {
            clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 정리
        };
    }, [dispatch]);
};