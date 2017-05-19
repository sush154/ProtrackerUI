import {Injectable} from '@angular/core';


@Injectable()
export class CommonAppService {


    getCookies(cname : string) : string {
        var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
    }

    setCookies(cookieName : string, cookieValue : string, expiresDays : number) : void {
        var d = new Date();
        d.setTime(d.getTime()+(expiresDays*24*60*60*1000));
        var exp = "expires="+d.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + ";" + exp + ";path=/";
    }

    deleteCookie(cookieName : string) : void {
        document.cookie = cookieName + "=;"+"path=/";
    }

}