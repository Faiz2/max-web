import EmberObject from '@ember/object';
import { getOwner } from '@ember/application';
import { inject } from '@ember/service';

export default EmberObject.create({
    callback(conn, services) {
        const progressMsg = function(){
            services.progress.setPercent(10)
        }

        progressMsg();
        conn.listen({
            onOpened: function ( message ) {//连接成功回调
                window.console.log("连接成功");
            },
            onClosed: function ( message ) {},
            onTextMessage: function ( message ) {
                window.console.info(message)
            }
        });
    }
})
