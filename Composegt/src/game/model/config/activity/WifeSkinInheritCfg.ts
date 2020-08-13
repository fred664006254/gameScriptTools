namespace Config
{
	export namespace AcCfg
	{
		export class WifeSkinInheritCfg 
		{
			public cost:number;	
        				
			//1次回顾获得记忆碎片				
			public wifeSkinInheritItem="6_2121_1";
							
			//记忆碎片上限				
			public wifeSkinInheritItemNum=20;				
							
            public wifeSkinInheritItemID=2121;
			//范蠡皮肤ID				
			public wifeSkinId=2051;			

            public wifeID = 205;	
							
			//100次回顾获得范蠡皮肤				
			public FireReward="16_2051_1";	
							
			//1次回顾获得记忆传承x个				
			public FirePool = []		
			// 	{"6_2114_1",70,0,0},				
			// 	{"6_2114_2",20,0,0},				
			// 	{"6_2114_3",10,0,0},				
			// },				
        				
        //-活动期间，抽奖次数的进度奖励				
        //needNum：所需回顾次数				
        //getReward：奖励				
        	public FireNum:{needNum:number,getReward:string}[] = [];
			
			// public Scene:{SceneNum:number}[] = [];
			public formatData(data:any):void
			{
              	for (var key in data) {
				  	if (data.hasOwnProperty(key)) {
					  	this[key] = data[key];
				  	}
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
			public getServantSkinId()
			{
				return this.FireReward.split("_")[1];
			}

            private AVGDialog_code1 = {

				
                id0 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":"wife_skin_2051","nameId":"wifeName_205","clickContinue":true,"resEndId":"205"},
                    "2":{"nextId":null, "descId":2, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"205"},
                },
                id1 : {
                    "1":{"nextId":"2", "descId":3, "bgId":6,"personPic":"wife_skin_2051","nameId":"wifeName_205","clickContinue":true,"resEndId":"205"},
                    "2":{"nextId":null, "descId":4, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"205"},
                },
                id2 : {
                    "1":{"nextId":"2", "descId":5, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"205"},
                    "2":{"nextId":null, "descId":6, "bgId":6,"personPic":"wife_skin_2051","nameId":"wifeName_205","clickContinue":true,"resEndId":"205"},
                },
                id3 : {
                    "1":{"nextId":"2", "descId":7, "bgId":6,"personPic":"wife_skin_2051","nameId":"wifeName_205","clickContinue":true,"resEndId":"205"},
                    "2":{"nextId":null, "descId":8, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"205"},
                },
				id4 : {
                    "1":{"nextId":"2", "descId":9, "bgId":6,"personPic":"wife_skin_2051","nameId":"wifeName_205","clickContinue":true,"resEndId":"205"},
                    "2":{"nextId":null, "descId":10, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"205"},
                },

                first:{
                    "1":{"nextId":"2", "descId":11, "bgId":6,"personPic":"wife_skin_2051","nameId":"wifeName_205","clickContinue":true,"resEndId":"205"},
                    "2":{"nextId":"3", "descId":12, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"205"},
                    "3":{"nextId":null, "descId":13, "bgId":6,"personPic":"wife_skin_2051","nameId":"wifeName_205","clickContinue":true,"resEndId":"205"},

                }
               

            };

		}
	}
}
		
