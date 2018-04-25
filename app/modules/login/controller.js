import Controller from '@ember/controller';
import { inject } from '@ember/service';
import {set,get} from '@ember/object';
import rsvp from 'rsvp';

export default Controller.extend({
    cookies: inject(),
    ajax: inject(),
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
                        window.console.info(response);
                        if (response.status === "ok") {
                            this.get('cookies').write('uid', response.result.uid);
                            this.get('cookies').write('user_token', response.result.user_token);
                            this.transitionToRoute('/');
                        } else {
                            alert('wrong')
                        }
                        return resolve({ resule: response});
            },
            () => {
                return reject("Access Error");}
        );
        });

        }
    }
})