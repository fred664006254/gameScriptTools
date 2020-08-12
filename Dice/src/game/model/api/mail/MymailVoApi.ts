/*
 *@description: 邮件数据格式化
 *@author: hwc 
 *@date: 2020-04-09 13:22:33
 *@version 0.0.1
 */

namespace Api
{
	export namespace MymailVoApi
	{
        let mailVo:MailVo = null;
        let checkts:number;
		export function formatData(data:any):void
		{
            if(!mailVo){
                mailVo = new MailVo();
            }
            mailVo.initData(data);
            checkts = data.checkts;
        }
        
        export function getMailVo(){
            return mailVo;
        }

        export function getMailIDs(){
            let readedMails = [];
            let unreadedMails = [];
            for (const key in mailVo.mailInfoMap) {
                if (mailVo.mailInfoMap.hasOwnProperty(key)) {
                    const element = mailVo.mailInfoMap[key];
                    if(element.isread == 0){
                        unreadedMails.push(key);
                    } else {
                        readedMails.push(key);
                    }
                }
            }
            readedMails.sort((a, b)=>{return mailVo.mailInfoMap[b].ts - mailVo.mailInfoMap[a].ts});
            unreadedMails.sort((a, b)=>{return mailVo.mailInfoMap[b].ts - mailVo.mailInfoMap[a].ts});
            return unreadedMails.concat(readedMails);
        }

        export function getMailByMailID(key:string){
            let mailInfo = new MailInfoVo();
            mailInfo.initData(mailVo.mailInfoMap[key]);
            return mailInfo;
        }

        export function getDetaTimeByMailID(mailID:string){
            return checkts - getMailByMailID(mailID).ts;
        }

        export function hasUnreadMail():boolean{
            return mailVo.unread > 0;
        }

        export function dispose(){
            mailVo = null;
            checkts = 0;
        }
	}
}