namespace Config
{
    export namespace AcCfg
    {
        export class WifeBathingCfg
        {
            public wifeId:string;
            //红颜场景ID，购买的红颜场景ID
            public wifeBathingId: string;
            //每充值1元宝转换成X的进度值
            public exchange: number;
            //需求花朵数量
            public need: number;
            public formatData(data: any): void
            {
                if(data.wifeId){
                    this.wifeId = data.wifeId;
                }
                if(data.wifeBathingId){
                    this.wifeBathingId = data.wifeBathingId;
                }
                if(data.exchange){
                    this.exchange = data.exchange;
                }
                if(data.need){
                    this.need = data.need;
                }  
                
            }
            public getDialogById(id, code):any{
                
                let ccode = null;
                if(this["AVGDialog_code" + code]) {
                    ccode = code;
                } else {
                    ccode = 1;
                }
                if(id=="first"){
                    return this["AVGDialog_code" + ccode]["first"];
                } else {
                    return this["AVGDialog_code" + ccode][`id${id}`];
                }   
            }


            private AVGDialog_code1 = {
                first:{
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":"","nameId":"storyNPCName0","clickContinue":true,"resEndId":"302"},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"wife_full_302","nameId":"wifeName_302","clickContinue":true,"resEndId":"302"},
                    "3":{"nextId":"4", "descId":3, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"302"},
                    "4":{"nextId":"5", "descId":4, "bgId":6,"personPic":"wife_full_302","nameId":"wifeName_302","clickContinue":true,"resEndId":"302"},
                    "5":{"nextId":null, "descId":5, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"302"},
                }
               

            };

              public get AVGDialog_code2 () {
              return{ first:{
                        "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":"","nameId":"storyNPCName0","clickContinue":true,"resEndId":this.wifeId},
                        "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"wife_full_" + this.wifeId ,"nameId":"wifeName_" + this.wifeId,"clickContinue":true,"resEndId":this.wifeId},
                        "3":{"nextId":"4", "descId":3, "bgId":6,"personPic":"wife_full_" + this.wifeId ,"nameId":"wifeName_" + this.wifeId,"clickContinue":true,"resEndId":this.wifeId},
                        "4":{"nextId":"5", "descId":4, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":this.wifeId},
                        "5":{"nextId":null, "descId":5, "bgId":6,"personPic":"wife_full_" + this.wifeId ,"nameId":"wifeName_" + this.wifeId,"clickContinue":true,"resEndId":this.wifeId},
                        // "5":{"nextId":null, "descId":5, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":this.wifeId},
                    }
                }
            };
        }

    }

}