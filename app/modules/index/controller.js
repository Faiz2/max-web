import Controller from '@ember/controller';
import { inject } from '@ember/service';
import rsvp from 'rsvp';

export default Controller.extend({
    cookies: inject(),
    ajax: inject(),
    webIm: inject('xmpp-service'),
    userIsLoggedIn: false,
    getAjaxOpt(data) {
        return {
            method: 'POST',
            dataType: "json",
            cache: false,
            data: JSON.stringify(data),
            contentType: "application/json,charset=utf-8",
            Accpt: "application/json,charset=utf-8",
        }
    },
    actions: {
        sbtInfo() {
            let condition = {
                "condition": {
                    "email": this.get('username'),
                    "password": this.get('password')
                }
            };
            new rsvp.Promise((resolve, reject) => {
                return this.get('ajax').request('api/user/login',
                    this.getAjaxOpt(condition)).then((response) => {
                        if (response.status === "ok") {
                            this.get('cookies').write('uid', response.result.uid);
                            this.get('cookies').write('user_token', response.result.user_token);
                            this.get('webIm').login('testUser','testPwd');
                            window.location = 'data-center';
                        } else {
                            alert('帐号或密码错误。');
                        }
                        return resolve({ resule: response});
                    },
                    () => {return reject("Access Error");}
                );
            });
        }
    }
})
