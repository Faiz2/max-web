import Controller from '@ember/controller';
import { inject } from '@ember/service';
import rsvp from 'rsvp';
import { later } from '@ember/runloop';

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
                            this.get('webIm').login('test','123123');
                            this.transitionToRoute('/data-center');
                        } else {
                            alert('帐号或密码错误。');
                        }
                        return resolve({ resule: response});
                    },
                    () => {return reject("Access Error");}
                );
            });
        },

        // 测试 按钮逻辑，后期删除
        testLogin() {
           // Log the user in, then reattempt previous transition if it exists.
           let previousTransition = this.get('previousTransition');
           if (previousTransition) {
                // 修改监听的数值为true
                this.set('userIsLoggedIn', true);
                this.set('previousTransition', null);
                previousTransition.retry();
           } else {
                // 回到主页（由于主页监听了是否登录，所以跳转到了没有监听登录的路由）
                this.transitionToRoute('/adddata/viewresults');
           }
         }
    }
})
