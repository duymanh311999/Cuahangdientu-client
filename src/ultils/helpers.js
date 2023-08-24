import icons from './icons';

const {AiFillStar, AiOutlineStar} = icons;

export const createSlug = string => string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join('-')

export const formatMoney = number => Number(number && number.toFixed(1)).toLocaleString()

export const randerStarFromNumber = (number, size) => {
    if(!Number(number)) return
    const stars = []
    number = Math.round(number)
    for(let i=0; i<+number; i++){
        stars.push(<AiFillStar color='orange' size={size || 16}/>)
    }
    for(let i=5; i>+number; i--){
        stars.push(<AiOutlineStar color='orange' size={size || 16}/>)
    }
    return stars
}

export function secondsToHms(d) {
    d = Number(d) / 1000;
    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);
    return ({h, m, s})
}

export const validate = (payload, setInvalidFields) => {
    let invalids = 0;
    const formatPayload = Object.entries(payload)
    for(let arr of formatPayload){
        if(arr[1].trim() === '' ){
            invalids++
            setInvalidFields(prev => [...prev, {name: arr[0], message:'Vui lòng điền trường này'}])
        }
    }
    for(let arr of formatPayload){
       switch (arr[0]) {
        case 'email':
            const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            if(!arr[1].match(regex)){
                invalids++
                setInvalidFields(prev => [...prev, {name: arr[0], message:'Email không hợp lệ'}])
            }
            break;
        case 'password':
            if(arr[1].length < 6){
                invalids++
                setInvalidFields(prev => [...prev, {name: arr[0], message:'Mật khẩu phải lớn hơn 6 ký tự'}])
            }
            break;
       
        default:
            break;
       }
    }

    return invalids
}

export const fotmatPrice = number => Math.round(number / 1000) * 1000