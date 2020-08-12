var $protobuf = window.protobuf;
$protobuf.roots.default=window;
// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.dice = (function() {

    /**
     * Namespace dice.
     * @exports dice
     * @namespace
     */
    var dice = {};

    dice.CsRayMsg = (function() {

        /**
         * Properties of a CsRayMsg.
         * @memberof dice
         * @interface ICsRayMsg
         * @property {number|null} [rnum] CsRayMsg rnum
         * @property {number|null} [uid] CsRayMsg uid
         * @property {string|null} [access_token] CsRayMsg access_token
         * @property {string|null} [secret] CsRayMsg secret
         * @property {number|Long|null} [ts] CsRayMsg ts
         * @property {number|null} [logints] CsRayMsg logints
         * @property {number|null} [zoneid] CsRayMsg zoneid
         * @property {Uint8Array|null} [params] CsRayMsg params
         * @property {string|null} [cmd] CsRayMsg cmd
         */

        /**
         * Constructs a new CsRayMsg.
         * @memberof dice
         * @classdesc Represents a CsRayMsg.
         * @implements ICsRayMsg
         * @constructor
         * @param {dice.ICsRayMsg=} [properties] Properties to set
         */
        function CsRayMsg(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CsRayMsg rnum.
         * @member {number} rnum
         * @memberof dice.CsRayMsg
         * @instance
         */
        CsRayMsg.prototype.rnum = 0;

        /**
         * CsRayMsg uid.
         * @member {number} uid
         * @memberof dice.CsRayMsg
         * @instance
         */
        CsRayMsg.prototype.uid = 0;

        /**
         * CsRayMsg access_token.
         * @member {string} access_token
         * @memberof dice.CsRayMsg
         * @instance
         */
        CsRayMsg.prototype.access_token = "";

        /**
         * CsRayMsg secret.
         * @member {string} secret
         * @memberof dice.CsRayMsg
         * @instance
         */
        CsRayMsg.prototype.secret = "";

        /**
         * CsRayMsg ts.
         * @member {number|Long} ts
         * @memberof dice.CsRayMsg
         * @instance
         */
        CsRayMsg.prototype.ts = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * CsRayMsg logints.
         * @member {number} logints
         * @memberof dice.CsRayMsg
         * @instance
         */
        CsRayMsg.prototype.logints = 0;

        /**
         * CsRayMsg zoneid.
         * @member {number} zoneid
         * @memberof dice.CsRayMsg
         * @instance
         */
        CsRayMsg.prototype.zoneid = 0;

        /**
         * CsRayMsg params.
         * @member {Uint8Array} params
         * @memberof dice.CsRayMsg
         * @instance
         */
        CsRayMsg.prototype.params = $util.newBuffer([]);

        /**
         * CsRayMsg cmd.
         * @member {string} cmd
         * @memberof dice.CsRayMsg
         * @instance
         */
        CsRayMsg.prototype.cmd = "";

        /**
         * Creates a new CsRayMsg instance using the specified properties.
         * @function create
         * @memberof dice.CsRayMsg
         * @static
         * @param {dice.ICsRayMsg=} [properties] Properties to set
         * @returns {dice.CsRayMsg} CsRayMsg instance
         */
        CsRayMsg.create = function create(properties) {
            return new CsRayMsg(properties);
        };

        /**
         * Encodes the specified CsRayMsg message. Does not implicitly {@link dice.CsRayMsg.verify|verify} messages.
         * @function encode
         * @memberof dice.CsRayMsg
         * @static
         * @param {dice.ICsRayMsg} message CsRayMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CsRayMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.rnum != null && message.hasOwnProperty("rnum"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.rnum);
            if (message.uid != null && message.hasOwnProperty("uid"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.uid);
            if (message.access_token != null && message.hasOwnProperty("access_token"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.access_token);
            if (message.secret != null && message.hasOwnProperty("secret"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.secret);
            if (message.ts != null && message.hasOwnProperty("ts"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.ts);
            if (message.logints != null && message.hasOwnProperty("logints"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.logints);
            if (message.zoneid != null && message.hasOwnProperty("zoneid"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.zoneid);
            if (message.params != null && message.hasOwnProperty("params"))
                writer.uint32(/* id 8, wireType 2 =*/66).bytes(message.params);
            if (message.cmd != null && message.hasOwnProperty("cmd"))
                writer.uint32(/* id 9, wireType 2 =*/74).string(message.cmd);
            return writer;
        };

        /**
         * Encodes the specified CsRayMsg message, length delimited. Does not implicitly {@link dice.CsRayMsg.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.CsRayMsg
         * @static
         * @param {dice.ICsRayMsg} message CsRayMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CsRayMsg.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CsRayMsg message from the specified reader or buffer.
         * @function decode
         * @memberof dice.CsRayMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.CsRayMsg} CsRayMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CsRayMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.CsRayMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.rnum = reader.int32();
                    break;
                case 2:
                    message.uid = reader.int32();
                    break;
                case 3:
                    message.access_token = reader.string();
                    break;
                case 4:
                    message.secret = reader.string();
                    break;
                case 5:
                    message.ts = reader.int64();
                    break;
                case 6:
                    message.logints = reader.int32();
                    break;
                case 7:
                    message.zoneid = reader.int32();
                    break;
                case 8:
                    message.params = reader.bytes();
                    break;
                case 9:
                    message.cmd = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CsRayMsg message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.CsRayMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.CsRayMsg} CsRayMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CsRayMsg.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CsRayMsg message.
         * @function verify
         * @memberof dice.CsRayMsg
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CsRayMsg.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.rnum != null && message.hasOwnProperty("rnum"))
                if (!$util.isInteger(message.rnum))
                    return "rnum: integer expected";
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!$util.isInteger(message.uid))
                    return "uid: integer expected";
            if (message.access_token != null && message.hasOwnProperty("access_token"))
                if (!$util.isString(message.access_token))
                    return "access_token: string expected";
            if (message.secret != null && message.hasOwnProperty("secret"))
                if (!$util.isString(message.secret))
                    return "secret: string expected";
            if (message.ts != null && message.hasOwnProperty("ts"))
                if (!$util.isInteger(message.ts) && !(message.ts && $util.isInteger(message.ts.low) && $util.isInteger(message.ts.high)))
                    return "ts: integer|Long expected";
            if (message.logints != null && message.hasOwnProperty("logints"))
                if (!$util.isInteger(message.logints))
                    return "logints: integer expected";
            if (message.zoneid != null && message.hasOwnProperty("zoneid"))
                if (!$util.isInteger(message.zoneid))
                    return "zoneid: integer expected";
            if (message.params != null && message.hasOwnProperty("params"))
                if (!(message.params && typeof message.params.length === "number" || $util.isString(message.params)))
                    return "params: buffer expected";
            if (message.cmd != null && message.hasOwnProperty("cmd"))
                if (!$util.isString(message.cmd))
                    return "cmd: string expected";
            return null;
        };

        return CsRayMsg;
    })();

    dice.ScRayMsg = (function() {

        /**
         * Properties of a ScRayMsg.
         * @memberof dice
         * @interface IScRayMsg
         * @property {number|null} [rnum] ScRayMsg rnum
         * @property {number|Long|null} [uid] ScRayMsg uid
         * @property {string|null} [access_token] ScRayMsg access_token
         * @property {number|Long|null} [ts] ScRayMsg ts
         * @property {number|null} [ret] ScRayMsg ret
         * @property {string|null} [msg] ScRayMsg msg
         * @property {number|null} [version] ScRayMsg version
         * @property {Object.<string,Uint8Array>|null} [model] ScRayMsg model
         * @property {Uint8Array|null} [data] ScRayMsg data
         * @property {string|null} [cmd] ScRayMsg cmd
         */

        /**
         * Constructs a new ScRayMsg.
         * @memberof dice
         * @classdesc Represents a ScRayMsg.
         * @implements IScRayMsg
         * @constructor
         * @param {dice.IScRayMsg=} [properties] Properties to set
         */
        function ScRayMsg(properties) {
            this.model = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ScRayMsg rnum.
         * @member {number} rnum
         * @memberof dice.ScRayMsg
         * @instance
         */
        ScRayMsg.prototype.rnum = 0;

        /**
         * ScRayMsg uid.
         * @member {number|Long} uid
         * @memberof dice.ScRayMsg
         * @instance
         */
        ScRayMsg.prototype.uid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * ScRayMsg access_token.
         * @member {string} access_token
         * @memberof dice.ScRayMsg
         * @instance
         */
        ScRayMsg.prototype.access_token = "";

        /**
         * ScRayMsg ts.
         * @member {number|Long} ts
         * @memberof dice.ScRayMsg
         * @instance
         */
        ScRayMsg.prototype.ts = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * ScRayMsg ret.
         * @member {number} ret
         * @memberof dice.ScRayMsg
         * @instance
         */
        ScRayMsg.prototype.ret = 0;

        /**
         * ScRayMsg msg.
         * @member {string} msg
         * @memberof dice.ScRayMsg
         * @instance
         */
        ScRayMsg.prototype.msg = "";

        /**
         * ScRayMsg version.
         * @member {number} version
         * @memberof dice.ScRayMsg
         * @instance
         */
        ScRayMsg.prototype.version = 0;

        /**
         * ScRayMsg model.
         * @member {Object.<string,Uint8Array>} model
         * @memberof dice.ScRayMsg
         * @instance
         */
        ScRayMsg.prototype.model = $util.emptyObject;

        /**
         * ScRayMsg data.
         * @member {Uint8Array} data
         * @memberof dice.ScRayMsg
         * @instance
         */
        ScRayMsg.prototype.data = $util.newBuffer([]);

        /**
         * ScRayMsg cmd.
         * @member {string} cmd
         * @memberof dice.ScRayMsg
         * @instance
         */
        ScRayMsg.prototype.cmd = "";

        /**
         * Creates a new ScRayMsg instance using the specified properties.
         * @function create
         * @memberof dice.ScRayMsg
         * @static
         * @param {dice.IScRayMsg=} [properties] Properties to set
         * @returns {dice.ScRayMsg} ScRayMsg instance
         */
        ScRayMsg.create = function create(properties) {
            return new ScRayMsg(properties);
        };

        /**
         * Encodes the specified ScRayMsg message. Does not implicitly {@link dice.ScRayMsg.verify|verify} messages.
         * @function encode
         * @memberof dice.ScRayMsg
         * @static
         * @param {dice.IScRayMsg} message ScRayMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ScRayMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.rnum != null && message.hasOwnProperty("rnum"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.rnum);
            if (message.uid != null && message.hasOwnProperty("uid"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.uid);
            if (message.access_token != null && message.hasOwnProperty("access_token"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.access_token);
            if (message.ts != null && message.hasOwnProperty("ts"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.ts);
            if (message.ret != null && message.hasOwnProperty("ret"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.ret);
            if (message.msg != null && message.hasOwnProperty("msg"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.msg);
            if (message.version != null && message.hasOwnProperty("version"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.version);
            if (message.model != null && message.hasOwnProperty("model"))
                for (var keys = Object.keys(message.model), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 8, wireType 2 =*/66).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).bytes(message.model[keys[i]]).ldelim();
            if (message.data != null && message.hasOwnProperty("data"))
                writer.uint32(/* id 9, wireType 2 =*/74).bytes(message.data);
            if (message.cmd != null && message.hasOwnProperty("cmd"))
                writer.uint32(/* id 10, wireType 2 =*/82).string(message.cmd);
            return writer;
        };

        /**
         * Encodes the specified ScRayMsg message, length delimited. Does not implicitly {@link dice.ScRayMsg.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.ScRayMsg
         * @static
         * @param {dice.IScRayMsg} message ScRayMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ScRayMsg.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ScRayMsg message from the specified reader or buffer.
         * @function decode
         * @memberof dice.ScRayMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.ScRayMsg} ScRayMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ScRayMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.ScRayMsg(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.rnum = reader.int32();
                    break;
                case 2:
                    message.uid = reader.int64();
                    break;
                case 3:
                    message.access_token = reader.string();
                    break;
                case 4:
                    message.ts = reader.int64();
                    break;
                case 5:
                    message.ret = reader.int32();
                    break;
                case 6:
                    message.msg = reader.string();
                    break;
                case 7:
                    message.version = reader.int32();
                    break;
                case 8:
                    reader.skip().pos++;
                    if (message.model === $util.emptyObject)
                        message.model = {};
                    key = reader.string();
                    reader.pos++;
                    message.model[key] = reader.bytes();
                    break;
                case 9:
                    message.data = reader.bytes();
                    break;
                case 10:
                    message.cmd = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ScRayMsg message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.ScRayMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.ScRayMsg} ScRayMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ScRayMsg.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ScRayMsg message.
         * @function verify
         * @memberof dice.ScRayMsg
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ScRayMsg.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.rnum != null && message.hasOwnProperty("rnum"))
                if (!$util.isInteger(message.rnum))
                    return "rnum: integer expected";
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!$util.isInteger(message.uid) && !(message.uid && $util.isInteger(message.uid.low) && $util.isInteger(message.uid.high)))
                    return "uid: integer|Long expected";
            if (message.access_token != null && message.hasOwnProperty("access_token"))
                if (!$util.isString(message.access_token))
                    return "access_token: string expected";
            if (message.ts != null && message.hasOwnProperty("ts"))
                if (!$util.isInteger(message.ts) && !(message.ts && $util.isInteger(message.ts.low) && $util.isInteger(message.ts.high)))
                    return "ts: integer|Long expected";
            if (message.ret != null && message.hasOwnProperty("ret"))
                if (!$util.isInteger(message.ret))
                    return "ret: integer expected";
            if (message.msg != null && message.hasOwnProperty("msg"))
                if (!$util.isString(message.msg))
                    return "msg: string expected";
            if (message.version != null && message.hasOwnProperty("version"))
                if (!$util.isInteger(message.version))
                    return "version: integer expected";
            if (message.model != null && message.hasOwnProperty("model")) {
                if (!$util.isObject(message.model))
                    return "model: object expected";
                var key = Object.keys(message.model);
                for (var i = 0; i < key.length; ++i)
                    if (!(message.model[key[i]] && typeof message.model[key[i]].length === "number" || $util.isString(message.model[key[i]])))
                        return "model: buffer{k:string} expected";
            }
            if (message.data != null && message.hasOwnProperty("data"))
                if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                    return "data: buffer expected";
            if (message.cmd != null && message.hasOwnProperty("cmd"))
                if (!$util.isString(message.cmd))
                    return "cmd: string expected";
            return null;
        };

        return ScRayMsg;
    })();

    dice.cs_user_login = (function() {

        /**
         * Properties of a cs_user_login.
         * @memberof dice
         * @interface Ics_user_login
         * @property {string|null} [pid] cs_user_login pid
         * @property {string|null} [plat] cs_user_login plat
         * @property {string|null} [serverIp] cs_user_login serverIp
         * @property {string|null} [serverPort] cs_user_login serverPort
         * @property {string|null} [deviceid] cs_user_login deviceid
         * @property {boolean|null} [enter] cs_user_login enter
         * @property {string|null} [client_ip] cs_user_login client_ip
         */

        /**
         * Constructs a new cs_user_login.
         * @memberof dice
         * @classdesc Represents a cs_user_login.
         * @implements Ics_user_login
         * @constructor
         * @param {dice.Ics_user_login=} [properties] Properties to set
         */
        function cs_user_login(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_user_login pid.
         * @member {string} pid
         * @memberof dice.cs_user_login
         * @instance
         */
        cs_user_login.prototype.pid = "";

        /**
         * cs_user_login plat.
         * @member {string} plat
         * @memberof dice.cs_user_login
         * @instance
         */
        cs_user_login.prototype.plat = "";

        /**
         * cs_user_login serverIp.
         * @member {string} serverIp
         * @memberof dice.cs_user_login
         * @instance
         */
        cs_user_login.prototype.serverIp = "";

        /**
         * cs_user_login serverPort.
         * @member {string} serverPort
         * @memberof dice.cs_user_login
         * @instance
         */
        cs_user_login.prototype.serverPort = "";

        /**
         * cs_user_login deviceid.
         * @member {string} deviceid
         * @memberof dice.cs_user_login
         * @instance
         */
        cs_user_login.prototype.deviceid = "";

        /**
         * cs_user_login enter.
         * @member {boolean} enter
         * @memberof dice.cs_user_login
         * @instance
         */
        cs_user_login.prototype.enter = false;

        /**
         * cs_user_login client_ip.
         * @member {string} client_ip
         * @memberof dice.cs_user_login
         * @instance
         */
        cs_user_login.prototype.client_ip = "";

        /**
         * Creates a new cs_user_login instance using the specified properties.
         * @function create
         * @memberof dice.cs_user_login
         * @static
         * @param {dice.Ics_user_login=} [properties] Properties to set
         * @returns {dice.cs_user_login} cs_user_login instance
         */
        cs_user_login.create = function create(properties) {
            return new cs_user_login(properties);
        };

        /**
         * Encodes the specified cs_user_login message. Does not implicitly {@link dice.cs_user_login.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_user_login
         * @static
         * @param {dice.Ics_user_login} message cs_user_login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_user_login.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.pid != null && message.hasOwnProperty("pid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.pid);
            if (message.plat != null && message.hasOwnProperty("plat"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.plat);
            if (message.serverIp != null && message.hasOwnProperty("serverIp"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.serverIp);
            if (message.serverPort != null && message.hasOwnProperty("serverPort"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.serverPort);
            if (message.deviceid != null && message.hasOwnProperty("deviceid"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.deviceid);
            if (message.enter != null && message.hasOwnProperty("enter"))
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.enter);
            if (message.client_ip != null && message.hasOwnProperty("client_ip"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.client_ip);
            return writer;
        };

        /**
         * Encodes the specified cs_user_login message, length delimited. Does not implicitly {@link dice.cs_user_login.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_user_login
         * @static
         * @param {dice.Ics_user_login} message cs_user_login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_user_login.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_user_login message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_user_login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_user_login} cs_user_login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_user_login.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_user_login();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.pid = reader.string();
                    break;
                case 2:
                    message.plat = reader.string();
                    break;
                case 3:
                    message.serverIp = reader.string();
                    break;
                case 4:
                    message.serverPort = reader.string();
                    break;
                case 5:
                    message.deviceid = reader.string();
                    break;
                case 6:
                    message.enter = reader.bool();
                    break;
                case 7:
                    message.client_ip = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_user_login message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_user_login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_user_login} cs_user_login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_user_login.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_user_login message.
         * @function verify
         * @memberof dice.cs_user_login
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_user_login.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.pid != null && message.hasOwnProperty("pid"))
                if (!$util.isString(message.pid))
                    return "pid: string expected";
            if (message.plat != null && message.hasOwnProperty("plat"))
                if (!$util.isString(message.plat))
                    return "plat: string expected";
            if (message.serverIp != null && message.hasOwnProperty("serverIp"))
                if (!$util.isString(message.serverIp))
                    return "serverIp: string expected";
            if (message.serverPort != null && message.hasOwnProperty("serverPort"))
                if (!$util.isString(message.serverPort))
                    return "serverPort: string expected";
            if (message.deviceid != null && message.hasOwnProperty("deviceid"))
                if (!$util.isString(message.deviceid))
                    return "deviceid: string expected";
            if (message.enter != null && message.hasOwnProperty("enter"))
                if (typeof message.enter !== "boolean")
                    return "enter: boolean expected";
            if (message.client_ip != null && message.hasOwnProperty("client_ip"))
                if (!$util.isString(message.client_ip))
                    return "client_ip: string expected";
            return null;
        };

        return cs_user_login;
    })();

    dice.sc_user_login = (function() {

        /**
         * Properties of a sc_user_login.
         * @memberof dice
         * @interface Isc_user_login
         * @property {number|null} [timezone] sc_user_login timezone
         * @property {Object.<string,number>|null} [initRedpoint] sc_user_login initRedpoint
         * @property {string|null} [moneyType] sc_user_login moneyType
         * @property {Object.<string,string>|null} [orderCfg] sc_user_login orderCfg
         * @property {number|null} [regdt] sc_user_login regdt
         * @property {Object.<string,number>|null} ["switch"] sc_user_login switch
         * @property {number|null} [newerFlag] sc_user_login newerFlag
         */

        /**
         * Constructs a new sc_user_login.
         * @memberof dice
         * @classdesc Represents a sc_user_login.
         * @implements Isc_user_login
         * @constructor
         * @param {dice.Isc_user_login=} [properties] Properties to set
         */
        function sc_user_login(properties) {
            this.initRedpoint = {};
            this.orderCfg = {};
            this["switch"] = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * sc_user_login timezone.
         * @member {number} timezone
         * @memberof dice.sc_user_login
         * @instance
         */
        sc_user_login.prototype.timezone = 0;

        /**
         * sc_user_login initRedpoint.
         * @member {Object.<string,number>} initRedpoint
         * @memberof dice.sc_user_login
         * @instance
         */
        sc_user_login.prototype.initRedpoint = $util.emptyObject;

        /**
         * sc_user_login moneyType.
         * @member {string} moneyType
         * @memberof dice.sc_user_login
         * @instance
         */
        sc_user_login.prototype.moneyType = "";

        /**
         * sc_user_login orderCfg.
         * @member {Object.<string,string>} orderCfg
         * @memberof dice.sc_user_login
         * @instance
         */
        sc_user_login.prototype.orderCfg = $util.emptyObject;

        /**
         * sc_user_login regdt.
         * @member {number} regdt
         * @memberof dice.sc_user_login
         * @instance
         */
        sc_user_login.prototype.regdt = 0;

        /**
         * sc_user_login switch.
         * @member {Object.<string,number>} switch
         * @memberof dice.sc_user_login
         * @instance
         */
        sc_user_login.prototype["switch"] = $util.emptyObject;

        /**
         * sc_user_login newerFlag.
         * @member {number} newerFlag
         * @memberof dice.sc_user_login
         * @instance
         */
        sc_user_login.prototype.newerFlag = 0;

        /**
         * Creates a new sc_user_login instance using the specified properties.
         * @function create
         * @memberof dice.sc_user_login
         * @static
         * @param {dice.Isc_user_login=} [properties] Properties to set
         * @returns {dice.sc_user_login} sc_user_login instance
         */
        sc_user_login.create = function create(properties) {
            return new sc_user_login(properties);
        };

        /**
         * Encodes the specified sc_user_login message. Does not implicitly {@link dice.sc_user_login.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_user_login
         * @static
         * @param {dice.Isc_user_login} message sc_user_login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_user_login.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.timezone != null && message.hasOwnProperty("timezone"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.timezone);
            if (message.initRedpoint != null && message.hasOwnProperty("initRedpoint"))
                for (var keys = Object.keys(message.initRedpoint), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 0 =*/16).int32(message.initRedpoint[keys[i]]).ldelim();
            if (message.moneyType != null && message.hasOwnProperty("moneyType"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.moneyType);
            if (message.orderCfg != null && message.hasOwnProperty("orderCfg"))
                for (var keys = Object.keys(message.orderCfg), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 4, wireType 2 =*/34).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.orderCfg[keys[i]]).ldelim();
            if (message.regdt != null && message.hasOwnProperty("regdt"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.regdt);
            if (message["switch"] != null && message.hasOwnProperty("switch"))
                for (var keys = Object.keys(message["switch"]), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 6, wireType 2 =*/50).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 0 =*/16).int32(message["switch"][keys[i]]).ldelim();
            if (message.newerFlag != null && message.hasOwnProperty("newerFlag"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.newerFlag);
            return writer;
        };

        /**
         * Encodes the specified sc_user_login message, length delimited. Does not implicitly {@link dice.sc_user_login.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_user_login
         * @static
         * @param {dice.Isc_user_login} message sc_user_login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_user_login.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_user_login message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_user_login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_user_login} sc_user_login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_user_login.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_user_login(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.timezone = reader.int32();
                    break;
                case 2:
                    reader.skip().pos++;
                    if (message.initRedpoint === $util.emptyObject)
                        message.initRedpoint = {};
                    key = reader.string();
                    reader.pos++;
                    message.initRedpoint[key] = reader.int32();
                    break;
                case 3:
                    message.moneyType = reader.string();
                    break;
                case 4:
                    reader.skip().pos++;
                    if (message.orderCfg === $util.emptyObject)
                        message.orderCfg = {};
                    key = reader.string();
                    reader.pos++;
                    message.orderCfg[key] = reader.string();
                    break;
                case 5:
                    message.regdt = reader.int32();
                    break;
                case 6:
                    reader.skip().pos++;
                    if (message["switch"] === $util.emptyObject)
                        message["switch"] = {};
                    key = reader.string();
                    reader.pos++;
                    message["switch"][key] = reader.int32();
                    break;
                case 7:
                    message.newerFlag = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_user_login message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_user_login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_user_login} sc_user_login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_user_login.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_user_login message.
         * @function verify
         * @memberof dice.sc_user_login
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_user_login.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.timezone != null && message.hasOwnProperty("timezone"))
                if (!$util.isInteger(message.timezone))
                    return "timezone: integer expected";
            if (message.initRedpoint != null && message.hasOwnProperty("initRedpoint")) {
                if (!$util.isObject(message.initRedpoint))
                    return "initRedpoint: object expected";
                var key = Object.keys(message.initRedpoint);
                for (var i = 0; i < key.length; ++i)
                    if (!$util.isInteger(message.initRedpoint[key[i]]))
                        return "initRedpoint: integer{k:string} expected";
            }
            if (message.moneyType != null && message.hasOwnProperty("moneyType"))
                if (!$util.isString(message.moneyType))
                    return "moneyType: string expected";
            if (message.orderCfg != null && message.hasOwnProperty("orderCfg")) {
                if (!$util.isObject(message.orderCfg))
                    return "orderCfg: object expected";
                var key = Object.keys(message.orderCfg);
                for (var i = 0; i < key.length; ++i)
                    if (!$util.isString(message.orderCfg[key[i]]))
                        return "orderCfg: string{k:string} expected";
            }
            if (message.regdt != null && message.hasOwnProperty("regdt"))
                if (!$util.isInteger(message.regdt))
                    return "regdt: integer expected";
            if (message["switch"] != null && message.hasOwnProperty("switch")) {
                if (!$util.isObject(message["switch"]))
                    return "switch: object expected";
                var key = Object.keys(message["switch"]);
                for (var i = 0; i < key.length; ++i)
                    if (!$util.isInteger(message["switch"][key[i]]))
                        return "switch: integer{k:string} expected";
            }
            if (message.newerFlag != null && message.hasOwnProperty("newerFlag"))
                if (!$util.isInteger(message.newerFlag))
                    return "newerFlag: integer expected";
            return null;
        };

        return sc_user_login;
    })();

    dice.cs_user_createName = (function() {

        /**
         * Properties of a cs_user_createName.
         * @memberof dice
         * @interface Ics_user_createName
         * @property {string|null} [name] cs_user_createName name
         */

        /**
         * Constructs a new cs_user_createName.
         * @memberof dice
         * @classdesc Represents a cs_user_createName.
         * @implements Ics_user_createName
         * @constructor
         * @param {dice.Ics_user_createName=} [properties] Properties to set
         */
        function cs_user_createName(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_user_createName name.
         * @member {string} name
         * @memberof dice.cs_user_createName
         * @instance
         */
        cs_user_createName.prototype.name = "";

        /**
         * Creates a new cs_user_createName instance using the specified properties.
         * @function create
         * @memberof dice.cs_user_createName
         * @static
         * @param {dice.Ics_user_createName=} [properties] Properties to set
         * @returns {dice.cs_user_createName} cs_user_createName instance
         */
        cs_user_createName.create = function create(properties) {
            return new cs_user_createName(properties);
        };

        /**
         * Encodes the specified cs_user_createName message. Does not implicitly {@link dice.cs_user_createName.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_user_createName
         * @static
         * @param {dice.Ics_user_createName} message cs_user_createName message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_user_createName.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            return writer;
        };

        /**
         * Encodes the specified cs_user_createName message, length delimited. Does not implicitly {@link dice.cs_user_createName.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_user_createName
         * @static
         * @param {dice.Ics_user_createName} message cs_user_createName message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_user_createName.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_user_createName message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_user_createName
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_user_createName} cs_user_createName
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_user_createName.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_user_createName();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_user_createName message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_user_createName
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_user_createName} cs_user_createName
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_user_createName.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_user_createName message.
         * @function verify
         * @memberof dice.cs_user_createName
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_user_createName.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            return null;
        };

        return cs_user_createName;
    })();

    dice.sc_user_createName = (function() {

        /**
         * Properties of a sc_user_createName.
         * @memberof dice
         * @interface Isc_user_createName
         * @property {number|null} [nameFlag] sc_user_createName nameFlag
         */

        /**
         * Constructs a new sc_user_createName.
         * @memberof dice
         * @classdesc Represents a sc_user_createName.
         * @implements Isc_user_createName
         * @constructor
         * @param {dice.Isc_user_createName=} [properties] Properties to set
         */
        function sc_user_createName(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * sc_user_createName nameFlag.
         * @member {number} nameFlag
         * @memberof dice.sc_user_createName
         * @instance
         */
        sc_user_createName.prototype.nameFlag = 0;

        /**
         * Creates a new sc_user_createName instance using the specified properties.
         * @function create
         * @memberof dice.sc_user_createName
         * @static
         * @param {dice.Isc_user_createName=} [properties] Properties to set
         * @returns {dice.sc_user_createName} sc_user_createName instance
         */
        sc_user_createName.create = function create(properties) {
            return new sc_user_createName(properties);
        };

        /**
         * Encodes the specified sc_user_createName message. Does not implicitly {@link dice.sc_user_createName.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_user_createName
         * @static
         * @param {dice.Isc_user_createName} message sc_user_createName message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_user_createName.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.nameFlag != null && message.hasOwnProperty("nameFlag"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.nameFlag);
            return writer;
        };

        /**
         * Encodes the specified sc_user_createName message, length delimited. Does not implicitly {@link dice.sc_user_createName.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_user_createName
         * @static
         * @param {dice.Isc_user_createName} message sc_user_createName message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_user_createName.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_user_createName message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_user_createName
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_user_createName} sc_user_createName
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_user_createName.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_user_createName();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.nameFlag = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_user_createName message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_user_createName
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_user_createName} sc_user_createName
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_user_createName.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_user_createName message.
         * @function verify
         * @memberof dice.sc_user_createName
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_user_createName.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.nameFlag != null && message.hasOwnProperty("nameFlag"))
                if (!$util.isInteger(message.nameFlag))
                    return "nameFlag: integer expected";
            return null;
        };

        return sc_user_createName;
    })();

    dice.cs_user_rename = (function() {

        /**
         * Properties of a cs_user_rename.
         * @memberof dice
         * @interface Ics_user_rename
         * @property {string|null} [name] cs_user_rename name
         */

        /**
         * Constructs a new cs_user_rename.
         * @memberof dice
         * @classdesc Represents a cs_user_rename.
         * @implements Ics_user_rename
         * @constructor
         * @param {dice.Ics_user_rename=} [properties] Properties to set
         */
        function cs_user_rename(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_user_rename name.
         * @member {string} name
         * @memberof dice.cs_user_rename
         * @instance
         */
        cs_user_rename.prototype.name = "";

        /**
         * Creates a new cs_user_rename instance using the specified properties.
         * @function create
         * @memberof dice.cs_user_rename
         * @static
         * @param {dice.Ics_user_rename=} [properties] Properties to set
         * @returns {dice.cs_user_rename} cs_user_rename instance
         */
        cs_user_rename.create = function create(properties) {
            return new cs_user_rename(properties);
        };

        /**
         * Encodes the specified cs_user_rename message. Does not implicitly {@link dice.cs_user_rename.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_user_rename
         * @static
         * @param {dice.Ics_user_rename} message cs_user_rename message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_user_rename.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            return writer;
        };

        /**
         * Encodes the specified cs_user_rename message, length delimited. Does not implicitly {@link dice.cs_user_rename.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_user_rename
         * @static
         * @param {dice.Ics_user_rename} message cs_user_rename message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_user_rename.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_user_rename message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_user_rename
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_user_rename} cs_user_rename
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_user_rename.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_user_rename();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_user_rename message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_user_rename
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_user_rename} cs_user_rename
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_user_rename.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_user_rename message.
         * @function verify
         * @memberof dice.cs_user_rename
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_user_rename.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            return null;
        };

        return cs_user_rename;
    })();

    dice.sc_user_rename = (function() {

        /**
         * Properties of a sc_user_rename.
         * @memberof dice
         * @interface Isc_user_rename
         * @property {number|null} [nameFlag] sc_user_rename nameFlag
         */

        /**
         * Constructs a new sc_user_rename.
         * @memberof dice
         * @classdesc Represents a sc_user_rename.
         * @implements Isc_user_rename
         * @constructor
         * @param {dice.Isc_user_rename=} [properties] Properties to set
         */
        function sc_user_rename(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * sc_user_rename nameFlag.
         * @member {number} nameFlag
         * @memberof dice.sc_user_rename
         * @instance
         */
        sc_user_rename.prototype.nameFlag = 0;

        /**
         * Creates a new sc_user_rename instance using the specified properties.
         * @function create
         * @memberof dice.sc_user_rename
         * @static
         * @param {dice.Isc_user_rename=} [properties] Properties to set
         * @returns {dice.sc_user_rename} sc_user_rename instance
         */
        sc_user_rename.create = function create(properties) {
            return new sc_user_rename(properties);
        };

        /**
         * Encodes the specified sc_user_rename message. Does not implicitly {@link dice.sc_user_rename.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_user_rename
         * @static
         * @param {dice.Isc_user_rename} message sc_user_rename message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_user_rename.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.nameFlag != null && message.hasOwnProperty("nameFlag"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.nameFlag);
            return writer;
        };

        /**
         * Encodes the specified sc_user_rename message, length delimited. Does not implicitly {@link dice.sc_user_rename.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_user_rename
         * @static
         * @param {dice.Isc_user_rename} message sc_user_rename message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_user_rename.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_user_rename message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_user_rename
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_user_rename} sc_user_rename
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_user_rename.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_user_rename();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.nameFlag = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_user_rename message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_user_rename
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_user_rename} sc_user_rename
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_user_rename.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_user_rename message.
         * @function verify
         * @memberof dice.sc_user_rename
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_user_rename.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.nameFlag != null && message.hasOwnProperty("nameFlag"))
                if (!$util.isInteger(message.nameFlag))
                    return "nameFlag: integer expected";
            return null;
        };

        return sc_user_rename;
    })();

    dice.cs_user_resetwin = (function() {

        /**
         * Properties of a cs_user_resetwin.
         * @memberof dice
         * @interface Ics_user_resetwin
         */

        /**
         * Constructs a new cs_user_resetwin.
         * @memberof dice
         * @classdesc Represents a cs_user_resetwin.
         * @implements Ics_user_resetwin
         * @constructor
         * @param {dice.Ics_user_resetwin=} [properties] Properties to set
         */
        function cs_user_resetwin(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new cs_user_resetwin instance using the specified properties.
         * @function create
         * @memberof dice.cs_user_resetwin
         * @static
         * @param {dice.Ics_user_resetwin=} [properties] Properties to set
         * @returns {dice.cs_user_resetwin} cs_user_resetwin instance
         */
        cs_user_resetwin.create = function create(properties) {
            return new cs_user_resetwin(properties);
        };

        /**
         * Encodes the specified cs_user_resetwin message. Does not implicitly {@link dice.cs_user_resetwin.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_user_resetwin
         * @static
         * @param {dice.Ics_user_resetwin} message cs_user_resetwin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_user_resetwin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified cs_user_resetwin message, length delimited. Does not implicitly {@link dice.cs_user_resetwin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_user_resetwin
         * @static
         * @param {dice.Ics_user_resetwin} message cs_user_resetwin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_user_resetwin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_user_resetwin message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_user_resetwin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_user_resetwin} cs_user_resetwin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_user_resetwin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_user_resetwin();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_user_resetwin message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_user_resetwin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_user_resetwin} cs_user_resetwin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_user_resetwin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_user_resetwin message.
         * @function verify
         * @memberof dice.cs_user_resetwin
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_user_resetwin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return cs_user_resetwin;
    })();

    dice.sc_user_resetwin = (function() {

        /**
         * Properties of a sc_user_resetwin.
         * @memberof dice
         * @interface Isc_user_resetwin
         */

        /**
         * Constructs a new sc_user_resetwin.
         * @memberof dice
         * @classdesc Represents a sc_user_resetwin.
         * @implements Isc_user_resetwin
         * @constructor
         * @param {dice.Isc_user_resetwin=} [properties] Properties to set
         */
        function sc_user_resetwin(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new sc_user_resetwin instance using the specified properties.
         * @function create
         * @memberof dice.sc_user_resetwin
         * @static
         * @param {dice.Isc_user_resetwin=} [properties] Properties to set
         * @returns {dice.sc_user_resetwin} sc_user_resetwin instance
         */
        sc_user_resetwin.create = function create(properties) {
            return new sc_user_resetwin(properties);
        };

        /**
         * Encodes the specified sc_user_resetwin message. Does not implicitly {@link dice.sc_user_resetwin.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_user_resetwin
         * @static
         * @param {dice.Isc_user_resetwin} message sc_user_resetwin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_user_resetwin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified sc_user_resetwin message, length delimited. Does not implicitly {@link dice.sc_user_resetwin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_user_resetwin
         * @static
         * @param {dice.Isc_user_resetwin} message sc_user_resetwin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_user_resetwin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_user_resetwin message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_user_resetwin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_user_resetwin} sc_user_resetwin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_user_resetwin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_user_resetwin();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_user_resetwin message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_user_resetwin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_user_resetwin} sc_user_resetwin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_user_resetwin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_user_resetwin message.
         * @function verify
         * @memberof dice.sc_user_resetwin
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_user_resetwin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return sc_user_resetwin;
    })();

    dice.cs_user_resetjnum = (function() {

        /**
         * Properties of a cs_user_resetjnum.
         * @memberof dice
         * @interface Ics_user_resetjnum
         */

        /**
         * Constructs a new cs_user_resetjnum.
         * @memberof dice
         * @classdesc Represents a cs_user_resetjnum.
         * @implements Ics_user_resetjnum
         * @constructor
         * @param {dice.Ics_user_resetjnum=} [properties] Properties to set
         */
        function cs_user_resetjnum(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new cs_user_resetjnum instance using the specified properties.
         * @function create
         * @memberof dice.cs_user_resetjnum
         * @static
         * @param {dice.Ics_user_resetjnum=} [properties] Properties to set
         * @returns {dice.cs_user_resetjnum} cs_user_resetjnum instance
         */
        cs_user_resetjnum.create = function create(properties) {
            return new cs_user_resetjnum(properties);
        };

        /**
         * Encodes the specified cs_user_resetjnum message. Does not implicitly {@link dice.cs_user_resetjnum.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_user_resetjnum
         * @static
         * @param {dice.Ics_user_resetjnum} message cs_user_resetjnum message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_user_resetjnum.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified cs_user_resetjnum message, length delimited. Does not implicitly {@link dice.cs_user_resetjnum.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_user_resetjnum
         * @static
         * @param {dice.Ics_user_resetjnum} message cs_user_resetjnum message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_user_resetjnum.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_user_resetjnum message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_user_resetjnum
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_user_resetjnum} cs_user_resetjnum
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_user_resetjnum.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_user_resetjnum();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_user_resetjnum message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_user_resetjnum
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_user_resetjnum} cs_user_resetjnum
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_user_resetjnum.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_user_resetjnum message.
         * @function verify
         * @memberof dice.cs_user_resetjnum
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_user_resetjnum.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return cs_user_resetjnum;
    })();

    dice.sc_user_resetjnum = (function() {

        /**
         * Properties of a sc_user_resetjnum.
         * @memberof dice
         * @interface Isc_user_resetjnum
         */

        /**
         * Constructs a new sc_user_resetjnum.
         * @memberof dice
         * @classdesc Represents a sc_user_resetjnum.
         * @implements Isc_user_resetjnum
         * @constructor
         * @param {dice.Isc_user_resetjnum=} [properties] Properties to set
         */
        function sc_user_resetjnum(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new sc_user_resetjnum instance using the specified properties.
         * @function create
         * @memberof dice.sc_user_resetjnum
         * @static
         * @param {dice.Isc_user_resetjnum=} [properties] Properties to set
         * @returns {dice.sc_user_resetjnum} sc_user_resetjnum instance
         */
        sc_user_resetjnum.create = function create(properties) {
            return new sc_user_resetjnum(properties);
        };

        /**
         * Encodes the specified sc_user_resetjnum message. Does not implicitly {@link dice.sc_user_resetjnum.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_user_resetjnum
         * @static
         * @param {dice.Isc_user_resetjnum} message sc_user_resetjnum message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_user_resetjnum.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified sc_user_resetjnum message, length delimited. Does not implicitly {@link dice.sc_user_resetjnum.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_user_resetjnum
         * @static
         * @param {dice.Isc_user_resetjnum} message sc_user_resetjnum message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_user_resetjnum.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_user_resetjnum message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_user_resetjnum
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_user_resetjnum} sc_user_resetjnum
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_user_resetjnum.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_user_resetjnum();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_user_resetjnum message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_user_resetjnum
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_user_resetjnum} sc_user_resetjnum
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_user_resetjnum.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_user_resetjnum message.
         * @function verify
         * @memberof dice.sc_user_resetjnum
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_user_resetjnum.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return sc_user_resetjnum;
    })();

    dice.cs_user_openCardBox = (function() {

        /**
         * Properties of a cs_user_openCardBox.
         * @memberof dice
         * @interface Ics_user_openCardBox
         */

        /**
         * Constructs a new cs_user_openCardBox.
         * @memberof dice
         * @classdesc Represents a cs_user_openCardBox.
         * @implements Ics_user_openCardBox
         * @constructor
         * @param {dice.Ics_user_openCardBox=} [properties] Properties to set
         */
        function cs_user_openCardBox(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new cs_user_openCardBox instance using the specified properties.
         * @function create
         * @memberof dice.cs_user_openCardBox
         * @static
         * @param {dice.Ics_user_openCardBox=} [properties] Properties to set
         * @returns {dice.cs_user_openCardBox} cs_user_openCardBox instance
         */
        cs_user_openCardBox.create = function create(properties) {
            return new cs_user_openCardBox(properties);
        };

        /**
         * Encodes the specified cs_user_openCardBox message. Does not implicitly {@link dice.cs_user_openCardBox.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_user_openCardBox
         * @static
         * @param {dice.Ics_user_openCardBox} message cs_user_openCardBox message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_user_openCardBox.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified cs_user_openCardBox message, length delimited. Does not implicitly {@link dice.cs_user_openCardBox.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_user_openCardBox
         * @static
         * @param {dice.Ics_user_openCardBox} message cs_user_openCardBox message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_user_openCardBox.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_user_openCardBox message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_user_openCardBox
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_user_openCardBox} cs_user_openCardBox
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_user_openCardBox.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_user_openCardBox();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_user_openCardBox message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_user_openCardBox
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_user_openCardBox} cs_user_openCardBox
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_user_openCardBox.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_user_openCardBox message.
         * @function verify
         * @memberof dice.cs_user_openCardBox
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_user_openCardBox.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return cs_user_openCardBox;
    })();

    dice.sc_user_openCardBox = (function() {

        /**
         * Properties of a sc_user_openCardBox.
         * @memberof dice
         * @interface Isc_user_openCardBox
         * @property {string|null} [rewards] sc_user_openCardBox rewards
         */

        /**
         * Constructs a new sc_user_openCardBox.
         * @memberof dice
         * @classdesc Represents a sc_user_openCardBox.
         * @implements Isc_user_openCardBox
         * @constructor
         * @param {dice.Isc_user_openCardBox=} [properties] Properties to set
         */
        function sc_user_openCardBox(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * sc_user_openCardBox rewards.
         * @member {string} rewards
         * @memberof dice.sc_user_openCardBox
         * @instance
         */
        sc_user_openCardBox.prototype.rewards = "";

        /**
         * Creates a new sc_user_openCardBox instance using the specified properties.
         * @function create
         * @memberof dice.sc_user_openCardBox
         * @static
         * @param {dice.Isc_user_openCardBox=} [properties] Properties to set
         * @returns {dice.sc_user_openCardBox} sc_user_openCardBox instance
         */
        sc_user_openCardBox.create = function create(properties) {
            return new sc_user_openCardBox(properties);
        };

        /**
         * Encodes the specified sc_user_openCardBox message. Does not implicitly {@link dice.sc_user_openCardBox.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_user_openCardBox
         * @static
         * @param {dice.Isc_user_openCardBox} message sc_user_openCardBox message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_user_openCardBox.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.rewards);
            return writer;
        };

        /**
         * Encodes the specified sc_user_openCardBox message, length delimited. Does not implicitly {@link dice.sc_user_openCardBox.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_user_openCardBox
         * @static
         * @param {dice.Isc_user_openCardBox} message sc_user_openCardBox message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_user_openCardBox.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_user_openCardBox message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_user_openCardBox
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_user_openCardBox} sc_user_openCardBox
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_user_openCardBox.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_user_openCardBox();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.rewards = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_user_openCardBox message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_user_openCardBox
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_user_openCardBox} sc_user_openCardBox
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_user_openCardBox.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_user_openCardBox message.
         * @function verify
         * @memberof dice.sc_user_openCardBox
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_user_openCardBox.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                if (!$util.isString(message.rewards))
                    return "rewards: string expected";
            return null;
        };

        return sc_user_openCardBox;
    })();

    dice.cs_user_getRoyalPass = (function() {

        /**
         * Properties of a cs_user_getRoyalPass.
         * @memberof dice
         * @interface Ics_user_getRoyalPass
         * @property {number|null} [isAdvanced] cs_user_getRoyalPass isAdvanced
         * @property {string|null} [key] cs_user_getRoyalPass key
         */

        /**
         * Constructs a new cs_user_getRoyalPass.
         * @memberof dice
         * @classdesc Represents a cs_user_getRoyalPass.
         * @implements Ics_user_getRoyalPass
         * @constructor
         * @param {dice.Ics_user_getRoyalPass=} [properties] Properties to set
         */
        function cs_user_getRoyalPass(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_user_getRoyalPass isAdvanced.
         * @member {number} isAdvanced
         * @memberof dice.cs_user_getRoyalPass
         * @instance
         */
        cs_user_getRoyalPass.prototype.isAdvanced = 0;

        /**
         * cs_user_getRoyalPass key.
         * @member {string} key
         * @memberof dice.cs_user_getRoyalPass
         * @instance
         */
        cs_user_getRoyalPass.prototype.key = "";

        /**
         * Creates a new cs_user_getRoyalPass instance using the specified properties.
         * @function create
         * @memberof dice.cs_user_getRoyalPass
         * @static
         * @param {dice.Ics_user_getRoyalPass=} [properties] Properties to set
         * @returns {dice.cs_user_getRoyalPass} cs_user_getRoyalPass instance
         */
        cs_user_getRoyalPass.create = function create(properties) {
            return new cs_user_getRoyalPass(properties);
        };

        /**
         * Encodes the specified cs_user_getRoyalPass message. Does not implicitly {@link dice.cs_user_getRoyalPass.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_user_getRoyalPass
         * @static
         * @param {dice.Ics_user_getRoyalPass} message cs_user_getRoyalPass message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_user_getRoyalPass.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.isAdvanced != null && message.hasOwnProperty("isAdvanced"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.isAdvanced);
            if (message.key != null && message.hasOwnProperty("key"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.key);
            return writer;
        };

        /**
         * Encodes the specified cs_user_getRoyalPass message, length delimited. Does not implicitly {@link dice.cs_user_getRoyalPass.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_user_getRoyalPass
         * @static
         * @param {dice.Ics_user_getRoyalPass} message cs_user_getRoyalPass message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_user_getRoyalPass.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_user_getRoyalPass message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_user_getRoyalPass
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_user_getRoyalPass} cs_user_getRoyalPass
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_user_getRoyalPass.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_user_getRoyalPass();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.isAdvanced = reader.int32();
                    break;
                case 2:
                    message.key = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_user_getRoyalPass message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_user_getRoyalPass
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_user_getRoyalPass} cs_user_getRoyalPass
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_user_getRoyalPass.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_user_getRoyalPass message.
         * @function verify
         * @memberof dice.cs_user_getRoyalPass
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_user_getRoyalPass.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.isAdvanced != null && message.hasOwnProperty("isAdvanced"))
                if (!$util.isInteger(message.isAdvanced))
                    return "isAdvanced: integer expected";
            if (message.key != null && message.hasOwnProperty("key"))
                if (!$util.isString(message.key))
                    return "key: string expected";
            return null;
        };

        return cs_user_getRoyalPass;
    })();

    dice.sc_user_getRoyalPass = (function() {

        /**
         * Properties of a sc_user_getRoyalPass.
         * @memberof dice
         * @interface Isc_user_getRoyalPass
         * @property {string|null} [rewards] sc_user_getRoyalPass rewards
         */

        /**
         * Constructs a new sc_user_getRoyalPass.
         * @memberof dice
         * @classdesc Represents a sc_user_getRoyalPass.
         * @implements Isc_user_getRoyalPass
         * @constructor
         * @param {dice.Isc_user_getRoyalPass=} [properties] Properties to set
         */
        function sc_user_getRoyalPass(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * sc_user_getRoyalPass rewards.
         * @member {string} rewards
         * @memberof dice.sc_user_getRoyalPass
         * @instance
         */
        sc_user_getRoyalPass.prototype.rewards = "";

        /**
         * Creates a new sc_user_getRoyalPass instance using the specified properties.
         * @function create
         * @memberof dice.sc_user_getRoyalPass
         * @static
         * @param {dice.Isc_user_getRoyalPass=} [properties] Properties to set
         * @returns {dice.sc_user_getRoyalPass} sc_user_getRoyalPass instance
         */
        sc_user_getRoyalPass.create = function create(properties) {
            return new sc_user_getRoyalPass(properties);
        };

        /**
         * Encodes the specified sc_user_getRoyalPass message. Does not implicitly {@link dice.sc_user_getRoyalPass.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_user_getRoyalPass
         * @static
         * @param {dice.Isc_user_getRoyalPass} message sc_user_getRoyalPass message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_user_getRoyalPass.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.rewards);
            return writer;
        };

        /**
         * Encodes the specified sc_user_getRoyalPass message, length delimited. Does not implicitly {@link dice.sc_user_getRoyalPass.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_user_getRoyalPass
         * @static
         * @param {dice.Isc_user_getRoyalPass} message sc_user_getRoyalPass message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_user_getRoyalPass.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_user_getRoyalPass message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_user_getRoyalPass
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_user_getRoyalPass} sc_user_getRoyalPass
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_user_getRoyalPass.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_user_getRoyalPass();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.rewards = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_user_getRoyalPass message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_user_getRoyalPass
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_user_getRoyalPass} sc_user_getRoyalPass
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_user_getRoyalPass.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_user_getRoyalPass message.
         * @function verify
         * @memberof dice.sc_user_getRoyalPass
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_user_getRoyalPass.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                if (!$util.isString(message.rewards))
                    return "rewards: string expected";
            return null;
        };

        return sc_user_getRoyalPass;
    })();

    dice.cs_user_freshDayInfo = (function() {

        /**
         * Properties of a cs_user_freshDayInfo.
         * @memberof dice
         * @interface Ics_user_freshDayInfo
         */

        /**
         * Constructs a new cs_user_freshDayInfo.
         * @memberof dice
         * @classdesc Represents a cs_user_freshDayInfo.
         * @implements Ics_user_freshDayInfo
         * @constructor
         * @param {dice.Ics_user_freshDayInfo=} [properties] Properties to set
         */
        function cs_user_freshDayInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new cs_user_freshDayInfo instance using the specified properties.
         * @function create
         * @memberof dice.cs_user_freshDayInfo
         * @static
         * @param {dice.Ics_user_freshDayInfo=} [properties] Properties to set
         * @returns {dice.cs_user_freshDayInfo} cs_user_freshDayInfo instance
         */
        cs_user_freshDayInfo.create = function create(properties) {
            return new cs_user_freshDayInfo(properties);
        };

        /**
         * Encodes the specified cs_user_freshDayInfo message. Does not implicitly {@link dice.cs_user_freshDayInfo.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_user_freshDayInfo
         * @static
         * @param {dice.Ics_user_freshDayInfo} message cs_user_freshDayInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_user_freshDayInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified cs_user_freshDayInfo message, length delimited. Does not implicitly {@link dice.cs_user_freshDayInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_user_freshDayInfo
         * @static
         * @param {dice.Ics_user_freshDayInfo} message cs_user_freshDayInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_user_freshDayInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_user_freshDayInfo message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_user_freshDayInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_user_freshDayInfo} cs_user_freshDayInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_user_freshDayInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_user_freshDayInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_user_freshDayInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_user_freshDayInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_user_freshDayInfo} cs_user_freshDayInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_user_freshDayInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_user_freshDayInfo message.
         * @function verify
         * @memberof dice.cs_user_freshDayInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_user_freshDayInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return cs_user_freshDayInfo;
    })();

    dice.sc_user_freshDayInfo = (function() {

        /**
         * Properties of a sc_user_freshDayInfo.
         * @memberof dice
         * @interface Isc_user_freshDayInfo
         */

        /**
         * Constructs a new sc_user_freshDayInfo.
         * @memberof dice
         * @classdesc Represents a sc_user_freshDayInfo.
         * @implements Isc_user_freshDayInfo
         * @constructor
         * @param {dice.Isc_user_freshDayInfo=} [properties] Properties to set
         */
        function sc_user_freshDayInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new sc_user_freshDayInfo instance using the specified properties.
         * @function create
         * @memberof dice.sc_user_freshDayInfo
         * @static
         * @param {dice.Isc_user_freshDayInfo=} [properties] Properties to set
         * @returns {dice.sc_user_freshDayInfo} sc_user_freshDayInfo instance
         */
        sc_user_freshDayInfo.create = function create(properties) {
            return new sc_user_freshDayInfo(properties);
        };

        /**
         * Encodes the specified sc_user_freshDayInfo message. Does not implicitly {@link dice.sc_user_freshDayInfo.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_user_freshDayInfo
         * @static
         * @param {dice.Isc_user_freshDayInfo} message sc_user_freshDayInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_user_freshDayInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified sc_user_freshDayInfo message, length delimited. Does not implicitly {@link dice.sc_user_freshDayInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_user_freshDayInfo
         * @static
         * @param {dice.Isc_user_freshDayInfo} message sc_user_freshDayInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_user_freshDayInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_user_freshDayInfo message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_user_freshDayInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_user_freshDayInfo} sc_user_freshDayInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_user_freshDayInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_user_freshDayInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_user_freshDayInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_user_freshDayInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_user_freshDayInfo} sc_user_freshDayInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_user_freshDayInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_user_freshDayInfo message.
         * @function verify
         * @memberof dice.sc_user_freshDayInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_user_freshDayInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return sc_user_freshDayInfo;
    })();

    dice.cs_user_newerGuild = (function() {

        /**
         * Properties of a cs_user_newerGuild.
         * @memberof dice
         * @interface Ics_user_newerGuild
         * @property {number|null} [step] cs_user_newerGuild step
         */

        /**
         * Constructs a new cs_user_newerGuild.
         * @memberof dice
         * @classdesc Represents a cs_user_newerGuild.
         * @implements Ics_user_newerGuild
         * @constructor
         * @param {dice.Ics_user_newerGuild=} [properties] Properties to set
         */
        function cs_user_newerGuild(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_user_newerGuild step.
         * @member {number} step
         * @memberof dice.cs_user_newerGuild
         * @instance
         */
        cs_user_newerGuild.prototype.step = 0;

        /**
         * Creates a new cs_user_newerGuild instance using the specified properties.
         * @function create
         * @memberof dice.cs_user_newerGuild
         * @static
         * @param {dice.Ics_user_newerGuild=} [properties] Properties to set
         * @returns {dice.cs_user_newerGuild} cs_user_newerGuild instance
         */
        cs_user_newerGuild.create = function create(properties) {
            return new cs_user_newerGuild(properties);
        };

        /**
         * Encodes the specified cs_user_newerGuild message. Does not implicitly {@link dice.cs_user_newerGuild.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_user_newerGuild
         * @static
         * @param {dice.Ics_user_newerGuild} message cs_user_newerGuild message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_user_newerGuild.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.step != null && message.hasOwnProperty("step"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.step);
            return writer;
        };

        /**
         * Encodes the specified cs_user_newerGuild message, length delimited. Does not implicitly {@link dice.cs_user_newerGuild.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_user_newerGuild
         * @static
         * @param {dice.Ics_user_newerGuild} message cs_user_newerGuild message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_user_newerGuild.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_user_newerGuild message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_user_newerGuild
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_user_newerGuild} cs_user_newerGuild
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_user_newerGuild.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_user_newerGuild();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.step = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_user_newerGuild message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_user_newerGuild
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_user_newerGuild} cs_user_newerGuild
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_user_newerGuild.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_user_newerGuild message.
         * @function verify
         * @memberof dice.cs_user_newerGuild
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_user_newerGuild.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.step != null && message.hasOwnProperty("step"))
                if (!$util.isInteger(message.step))
                    return "step: integer expected";
            return null;
        };

        return cs_user_newerGuild;
    })();

    dice.sc_user_newerGuild = (function() {

        /**
         * Properties of a sc_user_newerGuild.
         * @memberof dice
         * @interface Isc_user_newerGuild
         */

        /**
         * Constructs a new sc_user_newerGuild.
         * @memberof dice
         * @classdesc Represents a sc_user_newerGuild.
         * @implements Isc_user_newerGuild
         * @constructor
         * @param {dice.Isc_user_newerGuild=} [properties] Properties to set
         */
        function sc_user_newerGuild(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new sc_user_newerGuild instance using the specified properties.
         * @function create
         * @memberof dice.sc_user_newerGuild
         * @static
         * @param {dice.Isc_user_newerGuild=} [properties] Properties to set
         * @returns {dice.sc_user_newerGuild} sc_user_newerGuild instance
         */
        sc_user_newerGuild.create = function create(properties) {
            return new sc_user_newerGuild(properties);
        };

        /**
         * Encodes the specified sc_user_newerGuild message. Does not implicitly {@link dice.sc_user_newerGuild.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_user_newerGuild
         * @static
         * @param {dice.Isc_user_newerGuild} message sc_user_newerGuild message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_user_newerGuild.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified sc_user_newerGuild message, length delimited. Does not implicitly {@link dice.sc_user_newerGuild.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_user_newerGuild
         * @static
         * @param {dice.Isc_user_newerGuild} message sc_user_newerGuild message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_user_newerGuild.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_user_newerGuild message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_user_newerGuild
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_user_newerGuild} sc_user_newerGuild
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_user_newerGuild.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_user_newerGuild();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_user_newerGuild message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_user_newerGuild
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_user_newerGuild} sc_user_newerGuild
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_user_newerGuild.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_user_newerGuild message.
         * @function verify
         * @memberof dice.sc_user_newerGuild
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_user_newerGuild.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return sc_user_newerGuild;
    })();

    dice.cs_user_stepGuild = (function() {

        /**
         * Properties of a cs_user_stepGuild.
         * @memberof dice
         * @interface Ics_user_stepGuild
         * @property {string|null} [stepId] cs_user_stepGuild stepId
         */

        /**
         * Constructs a new cs_user_stepGuild.
         * @memberof dice
         * @classdesc Represents a cs_user_stepGuild.
         * @implements Ics_user_stepGuild
         * @constructor
         * @param {dice.Ics_user_stepGuild=} [properties] Properties to set
         */
        function cs_user_stepGuild(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_user_stepGuild stepId.
         * @member {string} stepId
         * @memberof dice.cs_user_stepGuild
         * @instance
         */
        cs_user_stepGuild.prototype.stepId = "";

        /**
         * Creates a new cs_user_stepGuild instance using the specified properties.
         * @function create
         * @memberof dice.cs_user_stepGuild
         * @static
         * @param {dice.Ics_user_stepGuild=} [properties] Properties to set
         * @returns {dice.cs_user_stepGuild} cs_user_stepGuild instance
         */
        cs_user_stepGuild.create = function create(properties) {
            return new cs_user_stepGuild(properties);
        };

        /**
         * Encodes the specified cs_user_stepGuild message. Does not implicitly {@link dice.cs_user_stepGuild.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_user_stepGuild
         * @static
         * @param {dice.Ics_user_stepGuild} message cs_user_stepGuild message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_user_stepGuild.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.stepId != null && message.hasOwnProperty("stepId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.stepId);
            return writer;
        };

        /**
         * Encodes the specified cs_user_stepGuild message, length delimited. Does not implicitly {@link dice.cs_user_stepGuild.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_user_stepGuild
         * @static
         * @param {dice.Ics_user_stepGuild} message cs_user_stepGuild message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_user_stepGuild.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_user_stepGuild message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_user_stepGuild
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_user_stepGuild} cs_user_stepGuild
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_user_stepGuild.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_user_stepGuild();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.stepId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_user_stepGuild message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_user_stepGuild
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_user_stepGuild} cs_user_stepGuild
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_user_stepGuild.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_user_stepGuild message.
         * @function verify
         * @memberof dice.cs_user_stepGuild
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_user_stepGuild.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.stepId != null && message.hasOwnProperty("stepId"))
                if (!$util.isString(message.stepId))
                    return "stepId: string expected";
            return null;
        };

        return cs_user_stepGuild;
    })();

    dice.sc_user_stepGuild = (function() {

        /**
         * Properties of a sc_user_stepGuild.
         * @memberof dice
         * @interface Isc_user_stepGuild
         */

        /**
         * Constructs a new sc_user_stepGuild.
         * @memberof dice
         * @classdesc Represents a sc_user_stepGuild.
         * @implements Isc_user_stepGuild
         * @constructor
         * @param {dice.Isc_user_stepGuild=} [properties] Properties to set
         */
        function sc_user_stepGuild(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new sc_user_stepGuild instance using the specified properties.
         * @function create
         * @memberof dice.sc_user_stepGuild
         * @static
         * @param {dice.Isc_user_stepGuild=} [properties] Properties to set
         * @returns {dice.sc_user_stepGuild} sc_user_stepGuild instance
         */
        sc_user_stepGuild.create = function create(properties) {
            return new sc_user_stepGuild(properties);
        };

        /**
         * Encodes the specified sc_user_stepGuild message. Does not implicitly {@link dice.sc_user_stepGuild.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_user_stepGuild
         * @static
         * @param {dice.Isc_user_stepGuild} message sc_user_stepGuild message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_user_stepGuild.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified sc_user_stepGuild message, length delimited. Does not implicitly {@link dice.sc_user_stepGuild.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_user_stepGuild
         * @static
         * @param {dice.Isc_user_stepGuild} message sc_user_stepGuild message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_user_stepGuild.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_user_stepGuild message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_user_stepGuild
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_user_stepGuild} sc_user_stepGuild
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_user_stepGuild.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_user_stepGuild();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_user_stepGuild message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_user_stepGuild
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_user_stepGuild} sc_user_stepGuild
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_user_stepGuild.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_user_stepGuild message.
         * @function verify
         * @memberof dice.sc_user_stepGuild
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_user_stepGuild.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return sc_user_stepGuild;
    })();

    dice.cs_user_sync = (function() {

        /**
         * Properties of a cs_user_sync.
         * @memberof dice
         * @interface Ics_user_sync
         */

        /**
         * Constructs a new cs_user_sync.
         * @memberof dice
         * @classdesc Represents a cs_user_sync.
         * @implements Ics_user_sync
         * @constructor
         * @param {dice.Ics_user_sync=} [properties] Properties to set
         */
        function cs_user_sync(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new cs_user_sync instance using the specified properties.
         * @function create
         * @memberof dice.cs_user_sync
         * @static
         * @param {dice.Ics_user_sync=} [properties] Properties to set
         * @returns {dice.cs_user_sync} cs_user_sync instance
         */
        cs_user_sync.create = function create(properties) {
            return new cs_user_sync(properties);
        };

        /**
         * Encodes the specified cs_user_sync message. Does not implicitly {@link dice.cs_user_sync.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_user_sync
         * @static
         * @param {dice.Ics_user_sync} message cs_user_sync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_user_sync.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified cs_user_sync message, length delimited. Does not implicitly {@link dice.cs_user_sync.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_user_sync
         * @static
         * @param {dice.Ics_user_sync} message cs_user_sync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_user_sync.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_user_sync message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_user_sync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_user_sync} cs_user_sync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_user_sync.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_user_sync();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_user_sync message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_user_sync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_user_sync} cs_user_sync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_user_sync.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_user_sync message.
         * @function verify
         * @memberof dice.cs_user_sync
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_user_sync.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return cs_user_sync;
    })();

    dice.sc_user_sync = (function() {

        /**
         * Properties of a sc_user_sync.
         * @memberof dice
         * @interface Isc_user_sync
         */

        /**
         * Constructs a new sc_user_sync.
         * @memberof dice
         * @classdesc Represents a sc_user_sync.
         * @implements Isc_user_sync
         * @constructor
         * @param {dice.Isc_user_sync=} [properties] Properties to set
         */
        function sc_user_sync(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new sc_user_sync instance using the specified properties.
         * @function create
         * @memberof dice.sc_user_sync
         * @static
         * @param {dice.Isc_user_sync=} [properties] Properties to set
         * @returns {dice.sc_user_sync} sc_user_sync instance
         */
        sc_user_sync.create = function create(properties) {
            return new sc_user_sync(properties);
        };

        /**
         * Encodes the specified sc_user_sync message. Does not implicitly {@link dice.sc_user_sync.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_user_sync
         * @static
         * @param {dice.Isc_user_sync} message sc_user_sync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_user_sync.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified sc_user_sync message, length delimited. Does not implicitly {@link dice.sc_user_sync.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_user_sync
         * @static
         * @param {dice.Isc_user_sync} message sc_user_sync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_user_sync.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_user_sync message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_user_sync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_user_sync} sc_user_sync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_user_sync.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_user_sync();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_user_sync message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_user_sync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_user_sync} sc_user_sync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_user_sync.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_user_sync message.
         * @function verify
         * @memberof dice.sc_user_sync
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_user_sync.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return sc_user_sync;
    })();

    dice.cs_task_fresh = (function() {

        /**
         * Properties of a cs_task_fresh.
         * @memberof dice
         * @interface Ics_task_fresh
         * @property {number|null} [keyPos] cs_task_fresh keyPos
         */

        /**
         * Constructs a new cs_task_fresh.
         * @memberof dice
         * @classdesc Represents a cs_task_fresh.
         * @implements Ics_task_fresh
         * @constructor
         * @param {dice.Ics_task_fresh=} [properties] Properties to set
         */
        function cs_task_fresh(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_task_fresh keyPos.
         * @member {number} keyPos
         * @memberof dice.cs_task_fresh
         * @instance
         */
        cs_task_fresh.prototype.keyPos = 0;

        /**
         * Creates a new cs_task_fresh instance using the specified properties.
         * @function create
         * @memberof dice.cs_task_fresh
         * @static
         * @param {dice.Ics_task_fresh=} [properties] Properties to set
         * @returns {dice.cs_task_fresh} cs_task_fresh instance
         */
        cs_task_fresh.create = function create(properties) {
            return new cs_task_fresh(properties);
        };

        /**
         * Encodes the specified cs_task_fresh message. Does not implicitly {@link dice.cs_task_fresh.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_task_fresh
         * @static
         * @param {dice.Ics_task_fresh} message cs_task_fresh message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_task_fresh.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.keyPos != null && message.hasOwnProperty("keyPos"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.keyPos);
            return writer;
        };

        /**
         * Encodes the specified cs_task_fresh message, length delimited. Does not implicitly {@link dice.cs_task_fresh.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_task_fresh
         * @static
         * @param {dice.Ics_task_fresh} message cs_task_fresh message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_task_fresh.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_task_fresh message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_task_fresh
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_task_fresh} cs_task_fresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_task_fresh.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_task_fresh();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.keyPos = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_task_fresh message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_task_fresh
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_task_fresh} cs_task_fresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_task_fresh.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_task_fresh message.
         * @function verify
         * @memberof dice.cs_task_fresh
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_task_fresh.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.keyPos != null && message.hasOwnProperty("keyPos"))
                if (!$util.isInteger(message.keyPos))
                    return "keyPos: integer expected";
            return null;
        };

        return cs_task_fresh;
    })();

    dice.sc_task_fresh = (function() {

        /**
         * Properties of a sc_task_fresh.
         * @memberof dice
         * @interface Isc_task_fresh
         */

        /**
         * Constructs a new sc_task_fresh.
         * @memberof dice
         * @classdesc Represents a sc_task_fresh.
         * @implements Isc_task_fresh
         * @constructor
         * @param {dice.Isc_task_fresh=} [properties] Properties to set
         */
        function sc_task_fresh(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new sc_task_fresh instance using the specified properties.
         * @function create
         * @memberof dice.sc_task_fresh
         * @static
         * @param {dice.Isc_task_fresh=} [properties] Properties to set
         * @returns {dice.sc_task_fresh} sc_task_fresh instance
         */
        sc_task_fresh.create = function create(properties) {
            return new sc_task_fresh(properties);
        };

        /**
         * Encodes the specified sc_task_fresh message. Does not implicitly {@link dice.sc_task_fresh.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_task_fresh
         * @static
         * @param {dice.Isc_task_fresh} message sc_task_fresh message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_task_fresh.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified sc_task_fresh message, length delimited. Does not implicitly {@link dice.sc_task_fresh.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_task_fresh
         * @static
         * @param {dice.Isc_task_fresh} message sc_task_fresh message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_task_fresh.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_task_fresh message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_task_fresh
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_task_fresh} sc_task_fresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_task_fresh.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_task_fresh();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_task_fresh message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_task_fresh
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_task_fresh} sc_task_fresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_task_fresh.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_task_fresh message.
         * @function verify
         * @memberof dice.sc_task_fresh
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_task_fresh.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return sc_task_fresh;
    })();

    dice.cs_task_getDayRewards = (function() {

        /**
         * Properties of a cs_task_getDayRewards.
         * @memberof dice
         * @interface Ics_task_getDayRewards
         * @property {number|null} [keyPos] cs_task_getDayRewards keyPos
         */

        /**
         * Constructs a new cs_task_getDayRewards.
         * @memberof dice
         * @classdesc Represents a cs_task_getDayRewards.
         * @implements Ics_task_getDayRewards
         * @constructor
         * @param {dice.Ics_task_getDayRewards=} [properties] Properties to set
         */
        function cs_task_getDayRewards(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_task_getDayRewards keyPos.
         * @member {number} keyPos
         * @memberof dice.cs_task_getDayRewards
         * @instance
         */
        cs_task_getDayRewards.prototype.keyPos = 0;

        /**
         * Creates a new cs_task_getDayRewards instance using the specified properties.
         * @function create
         * @memberof dice.cs_task_getDayRewards
         * @static
         * @param {dice.Ics_task_getDayRewards=} [properties] Properties to set
         * @returns {dice.cs_task_getDayRewards} cs_task_getDayRewards instance
         */
        cs_task_getDayRewards.create = function create(properties) {
            return new cs_task_getDayRewards(properties);
        };

        /**
         * Encodes the specified cs_task_getDayRewards message. Does not implicitly {@link dice.cs_task_getDayRewards.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_task_getDayRewards
         * @static
         * @param {dice.Ics_task_getDayRewards} message cs_task_getDayRewards message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_task_getDayRewards.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.keyPos != null && message.hasOwnProperty("keyPos"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.keyPos);
            return writer;
        };

        /**
         * Encodes the specified cs_task_getDayRewards message, length delimited. Does not implicitly {@link dice.cs_task_getDayRewards.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_task_getDayRewards
         * @static
         * @param {dice.Ics_task_getDayRewards} message cs_task_getDayRewards message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_task_getDayRewards.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_task_getDayRewards message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_task_getDayRewards
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_task_getDayRewards} cs_task_getDayRewards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_task_getDayRewards.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_task_getDayRewards();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.keyPos = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_task_getDayRewards message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_task_getDayRewards
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_task_getDayRewards} cs_task_getDayRewards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_task_getDayRewards.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_task_getDayRewards message.
         * @function verify
         * @memberof dice.cs_task_getDayRewards
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_task_getDayRewards.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.keyPos != null && message.hasOwnProperty("keyPos"))
                if (!$util.isInteger(message.keyPos))
                    return "keyPos: integer expected";
            return null;
        };

        return cs_task_getDayRewards;
    })();

    dice.sc_task_getDayRewards = (function() {

        /**
         * Properties of a sc_task_getDayRewards.
         * @memberof dice
         * @interface Isc_task_getDayRewards
         * @property {string|null} [rewards] sc_task_getDayRewards rewards
         */

        /**
         * Constructs a new sc_task_getDayRewards.
         * @memberof dice
         * @classdesc Represents a sc_task_getDayRewards.
         * @implements Isc_task_getDayRewards
         * @constructor
         * @param {dice.Isc_task_getDayRewards=} [properties] Properties to set
         */
        function sc_task_getDayRewards(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * sc_task_getDayRewards rewards.
         * @member {string} rewards
         * @memberof dice.sc_task_getDayRewards
         * @instance
         */
        sc_task_getDayRewards.prototype.rewards = "";

        /**
         * Creates a new sc_task_getDayRewards instance using the specified properties.
         * @function create
         * @memberof dice.sc_task_getDayRewards
         * @static
         * @param {dice.Isc_task_getDayRewards=} [properties] Properties to set
         * @returns {dice.sc_task_getDayRewards} sc_task_getDayRewards instance
         */
        sc_task_getDayRewards.create = function create(properties) {
            return new sc_task_getDayRewards(properties);
        };

        /**
         * Encodes the specified sc_task_getDayRewards message. Does not implicitly {@link dice.sc_task_getDayRewards.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_task_getDayRewards
         * @static
         * @param {dice.Isc_task_getDayRewards} message sc_task_getDayRewards message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_task_getDayRewards.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.rewards);
            return writer;
        };

        /**
         * Encodes the specified sc_task_getDayRewards message, length delimited. Does not implicitly {@link dice.sc_task_getDayRewards.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_task_getDayRewards
         * @static
         * @param {dice.Isc_task_getDayRewards} message sc_task_getDayRewards message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_task_getDayRewards.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_task_getDayRewards message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_task_getDayRewards
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_task_getDayRewards} sc_task_getDayRewards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_task_getDayRewards.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_task_getDayRewards();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.rewards = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_task_getDayRewards message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_task_getDayRewards
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_task_getDayRewards} sc_task_getDayRewards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_task_getDayRewards.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_task_getDayRewards message.
         * @function verify
         * @memberof dice.sc_task_getDayRewards
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_task_getDayRewards.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                if (!$util.isString(message.rewards))
                    return "rewards: string expected";
            return null;
        };

        return sc_task_getDayRewards;
    })();

    dice.cs_task_getRewards = (function() {

        /**
         * Properties of a cs_task_getRewards.
         * @memberof dice
         * @interface Ics_task_getRewards
         * @property {string|null} [taskId] cs_task_getRewards taskId
         */

        /**
         * Constructs a new cs_task_getRewards.
         * @memberof dice
         * @classdesc Represents a cs_task_getRewards.
         * @implements Ics_task_getRewards
         * @constructor
         * @param {dice.Ics_task_getRewards=} [properties] Properties to set
         */
        function cs_task_getRewards(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_task_getRewards taskId.
         * @member {string} taskId
         * @memberof dice.cs_task_getRewards
         * @instance
         */
        cs_task_getRewards.prototype.taskId = "";

        /**
         * Creates a new cs_task_getRewards instance using the specified properties.
         * @function create
         * @memberof dice.cs_task_getRewards
         * @static
         * @param {dice.Ics_task_getRewards=} [properties] Properties to set
         * @returns {dice.cs_task_getRewards} cs_task_getRewards instance
         */
        cs_task_getRewards.create = function create(properties) {
            return new cs_task_getRewards(properties);
        };

        /**
         * Encodes the specified cs_task_getRewards message. Does not implicitly {@link dice.cs_task_getRewards.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_task_getRewards
         * @static
         * @param {dice.Ics_task_getRewards} message cs_task_getRewards message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_task_getRewards.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.taskId != null && message.hasOwnProperty("taskId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.taskId);
            return writer;
        };

        /**
         * Encodes the specified cs_task_getRewards message, length delimited. Does not implicitly {@link dice.cs_task_getRewards.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_task_getRewards
         * @static
         * @param {dice.Ics_task_getRewards} message cs_task_getRewards message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_task_getRewards.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_task_getRewards message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_task_getRewards
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_task_getRewards} cs_task_getRewards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_task_getRewards.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_task_getRewards();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.taskId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_task_getRewards message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_task_getRewards
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_task_getRewards} cs_task_getRewards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_task_getRewards.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_task_getRewards message.
         * @function verify
         * @memberof dice.cs_task_getRewards
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_task_getRewards.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.taskId != null && message.hasOwnProperty("taskId"))
                if (!$util.isString(message.taskId))
                    return "taskId: string expected";
            return null;
        };

        return cs_task_getRewards;
    })();

    dice.sc_task_getRewards = (function() {

        /**
         * Properties of a sc_task_getRewards.
         * @memberof dice
         * @interface Isc_task_getRewards
         * @property {string|null} [rewards] sc_task_getRewards rewards
         */

        /**
         * Constructs a new sc_task_getRewards.
         * @memberof dice
         * @classdesc Represents a sc_task_getRewards.
         * @implements Isc_task_getRewards
         * @constructor
         * @param {dice.Isc_task_getRewards=} [properties] Properties to set
         */
        function sc_task_getRewards(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * sc_task_getRewards rewards.
         * @member {string} rewards
         * @memberof dice.sc_task_getRewards
         * @instance
         */
        sc_task_getRewards.prototype.rewards = "";

        /**
         * Creates a new sc_task_getRewards instance using the specified properties.
         * @function create
         * @memberof dice.sc_task_getRewards
         * @static
         * @param {dice.Isc_task_getRewards=} [properties] Properties to set
         * @returns {dice.sc_task_getRewards} sc_task_getRewards instance
         */
        sc_task_getRewards.create = function create(properties) {
            return new sc_task_getRewards(properties);
        };

        /**
         * Encodes the specified sc_task_getRewards message. Does not implicitly {@link dice.sc_task_getRewards.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_task_getRewards
         * @static
         * @param {dice.Isc_task_getRewards} message sc_task_getRewards message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_task_getRewards.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.rewards);
            return writer;
        };

        /**
         * Encodes the specified sc_task_getRewards message, length delimited. Does not implicitly {@link dice.sc_task_getRewards.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_task_getRewards
         * @static
         * @param {dice.Isc_task_getRewards} message sc_task_getRewards message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_task_getRewards.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_task_getRewards message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_task_getRewards
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_task_getRewards} sc_task_getRewards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_task_getRewards.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_task_getRewards();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.rewards = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_task_getRewards message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_task_getRewards
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_task_getRewards} sc_task_getRewards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_task_getRewards.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_task_getRewards message.
         * @function verify
         * @memberof dice.sc_task_getRewards
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_task_getRewards.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                if (!$util.isString(message.rewards))
                    return "rewards: string expected";
            return null;
        };

        return sc_task_getRewards;
    })();

    dice.cs_task_getAchievement = (function() {

        /**
         * Properties of a cs_task_getAchievement.
         * @memberof dice
         * @interface Ics_task_getAchievement
         * @property {string|null} [rkey] cs_task_getAchievement rkey
         */

        /**
         * Constructs a new cs_task_getAchievement.
         * @memberof dice
         * @classdesc Represents a cs_task_getAchievement.
         * @implements Ics_task_getAchievement
         * @constructor
         * @param {dice.Ics_task_getAchievement=} [properties] Properties to set
         */
        function cs_task_getAchievement(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_task_getAchievement rkey.
         * @member {string} rkey
         * @memberof dice.cs_task_getAchievement
         * @instance
         */
        cs_task_getAchievement.prototype.rkey = "";

        /**
         * Creates a new cs_task_getAchievement instance using the specified properties.
         * @function create
         * @memberof dice.cs_task_getAchievement
         * @static
         * @param {dice.Ics_task_getAchievement=} [properties] Properties to set
         * @returns {dice.cs_task_getAchievement} cs_task_getAchievement instance
         */
        cs_task_getAchievement.create = function create(properties) {
            return new cs_task_getAchievement(properties);
        };

        /**
         * Encodes the specified cs_task_getAchievement message. Does not implicitly {@link dice.cs_task_getAchievement.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_task_getAchievement
         * @static
         * @param {dice.Ics_task_getAchievement} message cs_task_getAchievement message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_task_getAchievement.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.rkey != null && message.hasOwnProperty("rkey"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.rkey);
            return writer;
        };

        /**
         * Encodes the specified cs_task_getAchievement message, length delimited. Does not implicitly {@link dice.cs_task_getAchievement.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_task_getAchievement
         * @static
         * @param {dice.Ics_task_getAchievement} message cs_task_getAchievement message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_task_getAchievement.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_task_getAchievement message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_task_getAchievement
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_task_getAchievement} cs_task_getAchievement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_task_getAchievement.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_task_getAchievement();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.rkey = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_task_getAchievement message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_task_getAchievement
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_task_getAchievement} cs_task_getAchievement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_task_getAchievement.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_task_getAchievement message.
         * @function verify
         * @memberof dice.cs_task_getAchievement
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_task_getAchievement.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.rkey != null && message.hasOwnProperty("rkey"))
                if (!$util.isString(message.rkey))
                    return "rkey: string expected";
            return null;
        };

        return cs_task_getAchievement;
    })();

    dice.sc_task_getAchievement = (function() {

        /**
         * Properties of a sc_task_getAchievement.
         * @memberof dice
         * @interface Isc_task_getAchievement
         * @property {string|null} [rewards] sc_task_getAchievement rewards
         */

        /**
         * Constructs a new sc_task_getAchievement.
         * @memberof dice
         * @classdesc Represents a sc_task_getAchievement.
         * @implements Isc_task_getAchievement
         * @constructor
         * @param {dice.Isc_task_getAchievement=} [properties] Properties to set
         */
        function sc_task_getAchievement(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * sc_task_getAchievement rewards.
         * @member {string} rewards
         * @memberof dice.sc_task_getAchievement
         * @instance
         */
        sc_task_getAchievement.prototype.rewards = "";

        /**
         * Creates a new sc_task_getAchievement instance using the specified properties.
         * @function create
         * @memberof dice.sc_task_getAchievement
         * @static
         * @param {dice.Isc_task_getAchievement=} [properties] Properties to set
         * @returns {dice.sc_task_getAchievement} sc_task_getAchievement instance
         */
        sc_task_getAchievement.create = function create(properties) {
            return new sc_task_getAchievement(properties);
        };

        /**
         * Encodes the specified sc_task_getAchievement message. Does not implicitly {@link dice.sc_task_getAchievement.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_task_getAchievement
         * @static
         * @param {dice.Isc_task_getAchievement} message sc_task_getAchievement message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_task_getAchievement.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.rewards);
            return writer;
        };

        /**
         * Encodes the specified sc_task_getAchievement message, length delimited. Does not implicitly {@link dice.sc_task_getAchievement.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_task_getAchievement
         * @static
         * @param {dice.Isc_task_getAchievement} message sc_task_getAchievement message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_task_getAchievement.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_task_getAchievement message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_task_getAchievement
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_task_getAchievement} sc_task_getAchievement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_task_getAchievement.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_task_getAchievement();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.rewards = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_task_getAchievement message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_task_getAchievement
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_task_getAchievement} sc_task_getAchievement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_task_getAchievement.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_task_getAchievement message.
         * @function verify
         * @memberof dice.sc_task_getAchievement
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_task_getAchievement.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                if (!$util.isString(message.rewards))
                    return "rewards: string expected";
            return null;
        };

        return sc_task_getAchievement;
    })();

    dice.cs_shop_buyBox = (function() {

        /**
         * Properties of a cs_shop_buyBox.
         * @memberof dice
         * @interface Ics_shop_buyBox
         * @property {string|null} [shopId] cs_shop_buyBox shopId
         * @property {number|null} [idDiscout] cs_shop_buyBox idDiscout
         */

        /**
         * Constructs a new cs_shop_buyBox.
         * @memberof dice
         * @classdesc Represents a cs_shop_buyBox.
         * @implements Ics_shop_buyBox
         * @constructor
         * @param {dice.Ics_shop_buyBox=} [properties] Properties to set
         */
        function cs_shop_buyBox(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_shop_buyBox shopId.
         * @member {string} shopId
         * @memberof dice.cs_shop_buyBox
         * @instance
         */
        cs_shop_buyBox.prototype.shopId = "";

        /**
         * cs_shop_buyBox idDiscout.
         * @member {number} idDiscout
         * @memberof dice.cs_shop_buyBox
         * @instance
         */
        cs_shop_buyBox.prototype.idDiscout = 0;

        /**
         * Creates a new cs_shop_buyBox instance using the specified properties.
         * @function create
         * @memberof dice.cs_shop_buyBox
         * @static
         * @param {dice.Ics_shop_buyBox=} [properties] Properties to set
         * @returns {dice.cs_shop_buyBox} cs_shop_buyBox instance
         */
        cs_shop_buyBox.create = function create(properties) {
            return new cs_shop_buyBox(properties);
        };

        /**
         * Encodes the specified cs_shop_buyBox message. Does not implicitly {@link dice.cs_shop_buyBox.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_shop_buyBox
         * @static
         * @param {dice.Ics_shop_buyBox} message cs_shop_buyBox message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_shop_buyBox.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.shopId != null && message.hasOwnProperty("shopId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.shopId);
            if (message.idDiscout != null && message.hasOwnProperty("idDiscout"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.idDiscout);
            return writer;
        };

        /**
         * Encodes the specified cs_shop_buyBox message, length delimited. Does not implicitly {@link dice.cs_shop_buyBox.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_shop_buyBox
         * @static
         * @param {dice.Ics_shop_buyBox} message cs_shop_buyBox message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_shop_buyBox.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_shop_buyBox message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_shop_buyBox
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_shop_buyBox} cs_shop_buyBox
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_shop_buyBox.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_shop_buyBox();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.shopId = reader.string();
                    break;
                case 2:
                    message.idDiscout = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_shop_buyBox message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_shop_buyBox
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_shop_buyBox} cs_shop_buyBox
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_shop_buyBox.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_shop_buyBox message.
         * @function verify
         * @memberof dice.cs_shop_buyBox
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_shop_buyBox.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.shopId != null && message.hasOwnProperty("shopId"))
                if (!$util.isString(message.shopId))
                    return "shopId: string expected";
            if (message.idDiscout != null && message.hasOwnProperty("idDiscout"))
                if (!$util.isInteger(message.idDiscout))
                    return "idDiscout: integer expected";
            return null;
        };

        return cs_shop_buyBox;
    })();

    dice.sc_shop_buyBox = (function() {

        /**
         * Properties of a sc_shop_buyBox.
         * @memberof dice
         * @interface Isc_shop_buyBox
         * @property {string|null} [rewards] sc_shop_buyBox rewards
         */

        /**
         * Constructs a new sc_shop_buyBox.
         * @memberof dice
         * @classdesc Represents a sc_shop_buyBox.
         * @implements Isc_shop_buyBox
         * @constructor
         * @param {dice.Isc_shop_buyBox=} [properties] Properties to set
         */
        function sc_shop_buyBox(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * sc_shop_buyBox rewards.
         * @member {string} rewards
         * @memberof dice.sc_shop_buyBox
         * @instance
         */
        sc_shop_buyBox.prototype.rewards = "";

        /**
         * Creates a new sc_shop_buyBox instance using the specified properties.
         * @function create
         * @memberof dice.sc_shop_buyBox
         * @static
         * @param {dice.Isc_shop_buyBox=} [properties] Properties to set
         * @returns {dice.sc_shop_buyBox} sc_shop_buyBox instance
         */
        sc_shop_buyBox.create = function create(properties) {
            return new sc_shop_buyBox(properties);
        };

        /**
         * Encodes the specified sc_shop_buyBox message. Does not implicitly {@link dice.sc_shop_buyBox.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_shop_buyBox
         * @static
         * @param {dice.Isc_shop_buyBox} message sc_shop_buyBox message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_shop_buyBox.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.rewards);
            return writer;
        };

        /**
         * Encodes the specified sc_shop_buyBox message, length delimited. Does not implicitly {@link dice.sc_shop_buyBox.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_shop_buyBox
         * @static
         * @param {dice.Isc_shop_buyBox} message sc_shop_buyBox message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_shop_buyBox.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_shop_buyBox message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_shop_buyBox
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_shop_buyBox} sc_shop_buyBox
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_shop_buyBox.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_shop_buyBox();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.rewards = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_shop_buyBox message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_shop_buyBox
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_shop_buyBox} sc_shop_buyBox
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_shop_buyBox.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_shop_buyBox message.
         * @function verify
         * @memberof dice.sc_shop_buyBox
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_shop_buyBox.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                if (!$util.isString(message.rewards))
                    return "rewards: string expected";
            return null;
        };

        return sc_shop_buyBox;
    })();

    dice.cs_shop_buyDailyshop = (function() {

        /**
         * Properties of a cs_shop_buyDailyshop.
         * @memberof dice
         * @interface Ics_shop_buyDailyshop
         * @property {string|null} [shopId] cs_shop_buyDailyshop shopId
         */

        /**
         * Constructs a new cs_shop_buyDailyshop.
         * @memberof dice
         * @classdesc Represents a cs_shop_buyDailyshop.
         * @implements Ics_shop_buyDailyshop
         * @constructor
         * @param {dice.Ics_shop_buyDailyshop=} [properties] Properties to set
         */
        function cs_shop_buyDailyshop(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_shop_buyDailyshop shopId.
         * @member {string} shopId
         * @memberof dice.cs_shop_buyDailyshop
         * @instance
         */
        cs_shop_buyDailyshop.prototype.shopId = "";

        /**
         * Creates a new cs_shop_buyDailyshop instance using the specified properties.
         * @function create
         * @memberof dice.cs_shop_buyDailyshop
         * @static
         * @param {dice.Ics_shop_buyDailyshop=} [properties] Properties to set
         * @returns {dice.cs_shop_buyDailyshop} cs_shop_buyDailyshop instance
         */
        cs_shop_buyDailyshop.create = function create(properties) {
            return new cs_shop_buyDailyshop(properties);
        };

        /**
         * Encodes the specified cs_shop_buyDailyshop message. Does not implicitly {@link dice.cs_shop_buyDailyshop.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_shop_buyDailyshop
         * @static
         * @param {dice.Ics_shop_buyDailyshop} message cs_shop_buyDailyshop message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_shop_buyDailyshop.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.shopId != null && message.hasOwnProperty("shopId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.shopId);
            return writer;
        };

        /**
         * Encodes the specified cs_shop_buyDailyshop message, length delimited. Does not implicitly {@link dice.cs_shop_buyDailyshop.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_shop_buyDailyshop
         * @static
         * @param {dice.Ics_shop_buyDailyshop} message cs_shop_buyDailyshop message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_shop_buyDailyshop.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_shop_buyDailyshop message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_shop_buyDailyshop
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_shop_buyDailyshop} cs_shop_buyDailyshop
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_shop_buyDailyshop.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_shop_buyDailyshop();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.shopId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_shop_buyDailyshop message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_shop_buyDailyshop
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_shop_buyDailyshop} cs_shop_buyDailyshop
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_shop_buyDailyshop.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_shop_buyDailyshop message.
         * @function verify
         * @memberof dice.cs_shop_buyDailyshop
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_shop_buyDailyshop.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.shopId != null && message.hasOwnProperty("shopId"))
                if (!$util.isString(message.shopId))
                    return "shopId: string expected";
            return null;
        };

        return cs_shop_buyDailyshop;
    })();

    dice.sc_shop_buyDailyshop = (function() {

        /**
         * Properties of a sc_shop_buyDailyshop.
         * @memberof dice
         * @interface Isc_shop_buyDailyshop
         * @property {string|null} [rewards] sc_shop_buyDailyshop rewards
         */

        /**
         * Constructs a new sc_shop_buyDailyshop.
         * @memberof dice
         * @classdesc Represents a sc_shop_buyDailyshop.
         * @implements Isc_shop_buyDailyshop
         * @constructor
         * @param {dice.Isc_shop_buyDailyshop=} [properties] Properties to set
         */
        function sc_shop_buyDailyshop(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * sc_shop_buyDailyshop rewards.
         * @member {string} rewards
         * @memberof dice.sc_shop_buyDailyshop
         * @instance
         */
        sc_shop_buyDailyshop.prototype.rewards = "";

        /**
         * Creates a new sc_shop_buyDailyshop instance using the specified properties.
         * @function create
         * @memberof dice.sc_shop_buyDailyshop
         * @static
         * @param {dice.Isc_shop_buyDailyshop=} [properties] Properties to set
         * @returns {dice.sc_shop_buyDailyshop} sc_shop_buyDailyshop instance
         */
        sc_shop_buyDailyshop.create = function create(properties) {
            return new sc_shop_buyDailyshop(properties);
        };

        /**
         * Encodes the specified sc_shop_buyDailyshop message. Does not implicitly {@link dice.sc_shop_buyDailyshop.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_shop_buyDailyshop
         * @static
         * @param {dice.Isc_shop_buyDailyshop} message sc_shop_buyDailyshop message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_shop_buyDailyshop.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.rewards);
            return writer;
        };

        /**
         * Encodes the specified sc_shop_buyDailyshop message, length delimited. Does not implicitly {@link dice.sc_shop_buyDailyshop.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_shop_buyDailyshop
         * @static
         * @param {dice.Isc_shop_buyDailyshop} message sc_shop_buyDailyshop message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_shop_buyDailyshop.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_shop_buyDailyshop message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_shop_buyDailyshop
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_shop_buyDailyshop} sc_shop_buyDailyshop
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_shop_buyDailyshop.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_shop_buyDailyshop();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.rewards = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_shop_buyDailyshop message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_shop_buyDailyshop
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_shop_buyDailyshop} sc_shop_buyDailyshop
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_shop_buyDailyshop.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_shop_buyDailyshop message.
         * @function verify
         * @memberof dice.sc_shop_buyDailyshop
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_shop_buyDailyshop.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                if (!$util.isString(message.rewards))
                    return "rewards: string expected";
            return null;
        };

        return sc_shop_buyDailyshop;
    })();

    dice.cs_shop_buyGold = (function() {

        /**
         * Properties of a cs_shop_buyGold.
         * @memberof dice
         * @interface Ics_shop_buyGold
         * @property {string|null} [shopId] cs_shop_buyGold shopId
         */

        /**
         * Constructs a new cs_shop_buyGold.
         * @memberof dice
         * @classdesc Represents a cs_shop_buyGold.
         * @implements Ics_shop_buyGold
         * @constructor
         * @param {dice.Ics_shop_buyGold=} [properties] Properties to set
         */
        function cs_shop_buyGold(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_shop_buyGold shopId.
         * @member {string} shopId
         * @memberof dice.cs_shop_buyGold
         * @instance
         */
        cs_shop_buyGold.prototype.shopId = "";

        /**
         * Creates a new cs_shop_buyGold instance using the specified properties.
         * @function create
         * @memberof dice.cs_shop_buyGold
         * @static
         * @param {dice.Ics_shop_buyGold=} [properties] Properties to set
         * @returns {dice.cs_shop_buyGold} cs_shop_buyGold instance
         */
        cs_shop_buyGold.create = function create(properties) {
            return new cs_shop_buyGold(properties);
        };

        /**
         * Encodes the specified cs_shop_buyGold message. Does not implicitly {@link dice.cs_shop_buyGold.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_shop_buyGold
         * @static
         * @param {dice.Ics_shop_buyGold} message cs_shop_buyGold message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_shop_buyGold.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.shopId != null && message.hasOwnProperty("shopId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.shopId);
            return writer;
        };

        /**
         * Encodes the specified cs_shop_buyGold message, length delimited. Does not implicitly {@link dice.cs_shop_buyGold.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_shop_buyGold
         * @static
         * @param {dice.Ics_shop_buyGold} message cs_shop_buyGold message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_shop_buyGold.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_shop_buyGold message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_shop_buyGold
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_shop_buyGold} cs_shop_buyGold
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_shop_buyGold.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_shop_buyGold();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.shopId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_shop_buyGold message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_shop_buyGold
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_shop_buyGold} cs_shop_buyGold
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_shop_buyGold.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_shop_buyGold message.
         * @function verify
         * @memberof dice.cs_shop_buyGold
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_shop_buyGold.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.shopId != null && message.hasOwnProperty("shopId"))
                if (!$util.isString(message.shopId))
                    return "shopId: string expected";
            return null;
        };

        return cs_shop_buyGold;
    })();

    dice.sc_shop_buyGold = (function() {

        /**
         * Properties of a sc_shop_buyGold.
         * @memberof dice
         * @interface Isc_shop_buyGold
         */

        /**
         * Constructs a new sc_shop_buyGold.
         * @memberof dice
         * @classdesc Represents a sc_shop_buyGold.
         * @implements Isc_shop_buyGold
         * @constructor
         * @param {dice.Isc_shop_buyGold=} [properties] Properties to set
         */
        function sc_shop_buyGold(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new sc_shop_buyGold instance using the specified properties.
         * @function create
         * @memberof dice.sc_shop_buyGold
         * @static
         * @param {dice.Isc_shop_buyGold=} [properties] Properties to set
         * @returns {dice.sc_shop_buyGold} sc_shop_buyGold instance
         */
        sc_shop_buyGold.create = function create(properties) {
            return new sc_shop_buyGold(properties);
        };

        /**
         * Encodes the specified sc_shop_buyGold message. Does not implicitly {@link dice.sc_shop_buyGold.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_shop_buyGold
         * @static
         * @param {dice.Isc_shop_buyGold} message sc_shop_buyGold message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_shop_buyGold.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified sc_shop_buyGold message, length delimited. Does not implicitly {@link dice.sc_shop_buyGold.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_shop_buyGold
         * @static
         * @param {dice.Isc_shop_buyGold} message sc_shop_buyGold message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_shop_buyGold.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_shop_buyGold message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_shop_buyGold
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_shop_buyGold} sc_shop_buyGold
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_shop_buyGold.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_shop_buyGold();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_shop_buyGold message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_shop_buyGold
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_shop_buyGold} sc_shop_buyGold
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_shop_buyGold.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_shop_buyGold message.
         * @function verify
         * @memberof dice.sc_shop_buyGold
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_shop_buyGold.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return sc_shop_buyGold;
    })();

    dice.cs_shop_buyEmoticon = (function() {

        /**
         * Properties of a cs_shop_buyEmoticon.
         * @memberof dice
         * @interface Ics_shop_buyEmoticon
         * @property {string|null} [shopId] cs_shop_buyEmoticon shopId
         */

        /**
         * Constructs a new cs_shop_buyEmoticon.
         * @memberof dice
         * @classdesc Represents a cs_shop_buyEmoticon.
         * @implements Ics_shop_buyEmoticon
         * @constructor
         * @param {dice.Ics_shop_buyEmoticon=} [properties] Properties to set
         */
        function cs_shop_buyEmoticon(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_shop_buyEmoticon shopId.
         * @member {string} shopId
         * @memberof dice.cs_shop_buyEmoticon
         * @instance
         */
        cs_shop_buyEmoticon.prototype.shopId = "";

        /**
         * Creates a new cs_shop_buyEmoticon instance using the specified properties.
         * @function create
         * @memberof dice.cs_shop_buyEmoticon
         * @static
         * @param {dice.Ics_shop_buyEmoticon=} [properties] Properties to set
         * @returns {dice.cs_shop_buyEmoticon} cs_shop_buyEmoticon instance
         */
        cs_shop_buyEmoticon.create = function create(properties) {
            return new cs_shop_buyEmoticon(properties);
        };

        /**
         * Encodes the specified cs_shop_buyEmoticon message. Does not implicitly {@link dice.cs_shop_buyEmoticon.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_shop_buyEmoticon
         * @static
         * @param {dice.Ics_shop_buyEmoticon} message cs_shop_buyEmoticon message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_shop_buyEmoticon.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.shopId != null && message.hasOwnProperty("shopId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.shopId);
            return writer;
        };

        /**
         * Encodes the specified cs_shop_buyEmoticon message, length delimited. Does not implicitly {@link dice.cs_shop_buyEmoticon.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_shop_buyEmoticon
         * @static
         * @param {dice.Ics_shop_buyEmoticon} message cs_shop_buyEmoticon message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_shop_buyEmoticon.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_shop_buyEmoticon message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_shop_buyEmoticon
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_shop_buyEmoticon} cs_shop_buyEmoticon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_shop_buyEmoticon.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_shop_buyEmoticon();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.shopId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_shop_buyEmoticon message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_shop_buyEmoticon
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_shop_buyEmoticon} cs_shop_buyEmoticon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_shop_buyEmoticon.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_shop_buyEmoticon message.
         * @function verify
         * @memberof dice.cs_shop_buyEmoticon
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_shop_buyEmoticon.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.shopId != null && message.hasOwnProperty("shopId"))
                if (!$util.isString(message.shopId))
                    return "shopId: string expected";
            return null;
        };

        return cs_shop_buyEmoticon;
    })();

    dice.sc_shop_buyEmoticon = (function() {

        /**
         * Properties of a sc_shop_buyEmoticon.
         * @memberof dice
         * @interface Isc_shop_buyEmoticon
         */

        /**
         * Constructs a new sc_shop_buyEmoticon.
         * @memberof dice
         * @classdesc Represents a sc_shop_buyEmoticon.
         * @implements Isc_shop_buyEmoticon
         * @constructor
         * @param {dice.Isc_shop_buyEmoticon=} [properties] Properties to set
         */
        function sc_shop_buyEmoticon(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new sc_shop_buyEmoticon instance using the specified properties.
         * @function create
         * @memberof dice.sc_shop_buyEmoticon
         * @static
         * @param {dice.Isc_shop_buyEmoticon=} [properties] Properties to set
         * @returns {dice.sc_shop_buyEmoticon} sc_shop_buyEmoticon instance
         */
        sc_shop_buyEmoticon.create = function create(properties) {
            return new sc_shop_buyEmoticon(properties);
        };

        /**
         * Encodes the specified sc_shop_buyEmoticon message. Does not implicitly {@link dice.sc_shop_buyEmoticon.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_shop_buyEmoticon
         * @static
         * @param {dice.Isc_shop_buyEmoticon} message sc_shop_buyEmoticon message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_shop_buyEmoticon.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified sc_shop_buyEmoticon message, length delimited. Does not implicitly {@link dice.sc_shop_buyEmoticon.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_shop_buyEmoticon
         * @static
         * @param {dice.Isc_shop_buyEmoticon} message sc_shop_buyEmoticon message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_shop_buyEmoticon.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_shop_buyEmoticon message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_shop_buyEmoticon
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_shop_buyEmoticon} sc_shop_buyEmoticon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_shop_buyEmoticon.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_shop_buyEmoticon();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_shop_buyEmoticon message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_shop_buyEmoticon
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_shop_buyEmoticon} sc_shop_buyEmoticon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_shop_buyEmoticon.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_shop_buyEmoticon message.
         * @function verify
         * @memberof dice.sc_shop_buyEmoticon
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_shop_buyEmoticon.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return sc_shop_buyEmoticon;
    })();

    dice.cs_dice_upgrade = (function() {

        /**
         * Properties of a cs_dice_upgrade.
         * @memberof dice
         * @interface Ics_dice_upgrade
         * @property {string|null} [diceId] cs_dice_upgrade diceId
         */

        /**
         * Constructs a new cs_dice_upgrade.
         * @memberof dice
         * @classdesc Represents a cs_dice_upgrade.
         * @implements Ics_dice_upgrade
         * @constructor
         * @param {dice.Ics_dice_upgrade=} [properties] Properties to set
         */
        function cs_dice_upgrade(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_dice_upgrade diceId.
         * @member {string} diceId
         * @memberof dice.cs_dice_upgrade
         * @instance
         */
        cs_dice_upgrade.prototype.diceId = "";

        /**
         * Creates a new cs_dice_upgrade instance using the specified properties.
         * @function create
         * @memberof dice.cs_dice_upgrade
         * @static
         * @param {dice.Ics_dice_upgrade=} [properties] Properties to set
         * @returns {dice.cs_dice_upgrade} cs_dice_upgrade instance
         */
        cs_dice_upgrade.create = function create(properties) {
            return new cs_dice_upgrade(properties);
        };

        /**
         * Encodes the specified cs_dice_upgrade message. Does not implicitly {@link dice.cs_dice_upgrade.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_dice_upgrade
         * @static
         * @param {dice.Ics_dice_upgrade} message cs_dice_upgrade message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_dice_upgrade.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.diceId != null && message.hasOwnProperty("diceId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.diceId);
            return writer;
        };

        /**
         * Encodes the specified cs_dice_upgrade message, length delimited. Does not implicitly {@link dice.cs_dice_upgrade.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_dice_upgrade
         * @static
         * @param {dice.Ics_dice_upgrade} message cs_dice_upgrade message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_dice_upgrade.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_dice_upgrade message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_dice_upgrade
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_dice_upgrade} cs_dice_upgrade
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_dice_upgrade.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_dice_upgrade();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.diceId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_dice_upgrade message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_dice_upgrade
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_dice_upgrade} cs_dice_upgrade
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_dice_upgrade.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_dice_upgrade message.
         * @function verify
         * @memberof dice.cs_dice_upgrade
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_dice_upgrade.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.diceId != null && message.hasOwnProperty("diceId"))
                if (!$util.isString(message.diceId))
                    return "diceId: string expected";
            return null;
        };

        return cs_dice_upgrade;
    })();

    dice.sc_dice_upgrade = (function() {

        /**
         * Properties of a sc_dice_upgrade.
         * @memberof dice
         * @interface Isc_dice_upgrade
         */

        /**
         * Constructs a new sc_dice_upgrade.
         * @memberof dice
         * @classdesc Represents a sc_dice_upgrade.
         * @implements Isc_dice_upgrade
         * @constructor
         * @param {dice.Isc_dice_upgrade=} [properties] Properties to set
         */
        function sc_dice_upgrade(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new sc_dice_upgrade instance using the specified properties.
         * @function create
         * @memberof dice.sc_dice_upgrade
         * @static
         * @param {dice.Isc_dice_upgrade=} [properties] Properties to set
         * @returns {dice.sc_dice_upgrade} sc_dice_upgrade instance
         */
        sc_dice_upgrade.create = function create(properties) {
            return new sc_dice_upgrade(properties);
        };

        /**
         * Encodes the specified sc_dice_upgrade message. Does not implicitly {@link dice.sc_dice_upgrade.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_dice_upgrade
         * @static
         * @param {dice.Isc_dice_upgrade} message sc_dice_upgrade message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_dice_upgrade.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified sc_dice_upgrade message, length delimited. Does not implicitly {@link dice.sc_dice_upgrade.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_dice_upgrade
         * @static
         * @param {dice.Isc_dice_upgrade} message sc_dice_upgrade message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_dice_upgrade.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_dice_upgrade message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_dice_upgrade
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_dice_upgrade} sc_dice_upgrade
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_dice_upgrade.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_dice_upgrade();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_dice_upgrade message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_dice_upgrade
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_dice_upgrade} sc_dice_upgrade
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_dice_upgrade.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_dice_upgrade message.
         * @function verify
         * @memberof dice.sc_dice_upgrade
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_dice_upgrade.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return sc_dice_upgrade;
    })();

    dice.cs_dice_use = (function() {

        /**
         * Properties of a cs_dice_use.
         * @memberof dice
         * @interface Ics_dice_use
         * @property {string|null} [diceId] cs_dice_use diceId
         * @property {number|null} [lineNo] cs_dice_use lineNo
         * @property {number|null} [upPos] cs_dice_use upPos
         */

        /**
         * Constructs a new cs_dice_use.
         * @memberof dice
         * @classdesc Represents a cs_dice_use.
         * @implements Ics_dice_use
         * @constructor
         * @param {dice.Ics_dice_use=} [properties] Properties to set
         */
        function cs_dice_use(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_dice_use diceId.
         * @member {string} diceId
         * @memberof dice.cs_dice_use
         * @instance
         */
        cs_dice_use.prototype.diceId = "";

        /**
         * cs_dice_use lineNo.
         * @member {number} lineNo
         * @memberof dice.cs_dice_use
         * @instance
         */
        cs_dice_use.prototype.lineNo = 0;

        /**
         * cs_dice_use upPos.
         * @member {number} upPos
         * @memberof dice.cs_dice_use
         * @instance
         */
        cs_dice_use.prototype.upPos = 0;

        /**
         * Creates a new cs_dice_use instance using the specified properties.
         * @function create
         * @memberof dice.cs_dice_use
         * @static
         * @param {dice.Ics_dice_use=} [properties] Properties to set
         * @returns {dice.cs_dice_use} cs_dice_use instance
         */
        cs_dice_use.create = function create(properties) {
            return new cs_dice_use(properties);
        };

        /**
         * Encodes the specified cs_dice_use message. Does not implicitly {@link dice.cs_dice_use.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_dice_use
         * @static
         * @param {dice.Ics_dice_use} message cs_dice_use message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_dice_use.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.diceId != null && message.hasOwnProperty("diceId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.diceId);
            if (message.lineNo != null && message.hasOwnProperty("lineNo"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.lineNo);
            if (message.upPos != null && message.hasOwnProperty("upPos"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.upPos);
            return writer;
        };

        /**
         * Encodes the specified cs_dice_use message, length delimited. Does not implicitly {@link dice.cs_dice_use.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_dice_use
         * @static
         * @param {dice.Ics_dice_use} message cs_dice_use message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_dice_use.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_dice_use message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_dice_use
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_dice_use} cs_dice_use
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_dice_use.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_dice_use();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.diceId = reader.string();
                    break;
                case 2:
                    message.lineNo = reader.int32();
                    break;
                case 3:
                    message.upPos = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_dice_use message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_dice_use
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_dice_use} cs_dice_use
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_dice_use.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_dice_use message.
         * @function verify
         * @memberof dice.cs_dice_use
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_dice_use.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.diceId != null && message.hasOwnProperty("diceId"))
                if (!$util.isString(message.diceId))
                    return "diceId: string expected";
            if (message.lineNo != null && message.hasOwnProperty("lineNo"))
                if (!$util.isInteger(message.lineNo))
                    return "lineNo: integer expected";
            if (message.upPos != null && message.hasOwnProperty("upPos"))
                if (!$util.isInteger(message.upPos))
                    return "upPos: integer expected";
            return null;
        };

        return cs_dice_use;
    })();

    dice.sc_dice_use = (function() {

        /**
         * Properties of a sc_dice_use.
         * @memberof dice
         * @interface Isc_dice_use
         */

        /**
         * Constructs a new sc_dice_use.
         * @memberof dice
         * @classdesc Represents a sc_dice_use.
         * @implements Isc_dice_use
         * @constructor
         * @param {dice.Isc_dice_use=} [properties] Properties to set
         */
        function sc_dice_use(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new sc_dice_use instance using the specified properties.
         * @function create
         * @memberof dice.sc_dice_use
         * @static
         * @param {dice.Isc_dice_use=} [properties] Properties to set
         * @returns {dice.sc_dice_use} sc_dice_use instance
         */
        sc_dice_use.create = function create(properties) {
            return new sc_dice_use(properties);
        };

        /**
         * Encodes the specified sc_dice_use message. Does not implicitly {@link dice.sc_dice_use.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_dice_use
         * @static
         * @param {dice.Isc_dice_use} message sc_dice_use message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_dice_use.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified sc_dice_use message, length delimited. Does not implicitly {@link dice.sc_dice_use.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_dice_use
         * @static
         * @param {dice.Isc_dice_use} message sc_dice_use message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_dice_use.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_dice_use message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_dice_use
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_dice_use} sc_dice_use
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_dice_use.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_dice_use();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_dice_use message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_dice_use
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_dice_use} sc_dice_use
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_dice_use.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_dice_use message.
         * @function verify
         * @memberof dice.sc_dice_use
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_dice_use.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return sc_dice_use;
    })();

    dice.cs_dice_chooseLine = (function() {

        /**
         * Properties of a cs_dice_chooseLine.
         * @memberof dice
         * @interface Ics_dice_chooseLine
         * @property {number|null} [lineNo] cs_dice_chooseLine lineNo
         */

        /**
         * Constructs a new cs_dice_chooseLine.
         * @memberof dice
         * @classdesc Represents a cs_dice_chooseLine.
         * @implements Ics_dice_chooseLine
         * @constructor
         * @param {dice.Ics_dice_chooseLine=} [properties] Properties to set
         */
        function cs_dice_chooseLine(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_dice_chooseLine lineNo.
         * @member {number} lineNo
         * @memberof dice.cs_dice_chooseLine
         * @instance
         */
        cs_dice_chooseLine.prototype.lineNo = 0;

        /**
         * Creates a new cs_dice_chooseLine instance using the specified properties.
         * @function create
         * @memberof dice.cs_dice_chooseLine
         * @static
         * @param {dice.Ics_dice_chooseLine=} [properties] Properties to set
         * @returns {dice.cs_dice_chooseLine} cs_dice_chooseLine instance
         */
        cs_dice_chooseLine.create = function create(properties) {
            return new cs_dice_chooseLine(properties);
        };

        /**
         * Encodes the specified cs_dice_chooseLine message. Does not implicitly {@link dice.cs_dice_chooseLine.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_dice_chooseLine
         * @static
         * @param {dice.Ics_dice_chooseLine} message cs_dice_chooseLine message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_dice_chooseLine.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.lineNo != null && message.hasOwnProperty("lineNo"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.lineNo);
            return writer;
        };

        /**
         * Encodes the specified cs_dice_chooseLine message, length delimited. Does not implicitly {@link dice.cs_dice_chooseLine.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_dice_chooseLine
         * @static
         * @param {dice.Ics_dice_chooseLine} message cs_dice_chooseLine message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_dice_chooseLine.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_dice_chooseLine message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_dice_chooseLine
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_dice_chooseLine} cs_dice_chooseLine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_dice_chooseLine.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_dice_chooseLine();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.lineNo = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_dice_chooseLine message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_dice_chooseLine
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_dice_chooseLine} cs_dice_chooseLine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_dice_chooseLine.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_dice_chooseLine message.
         * @function verify
         * @memberof dice.cs_dice_chooseLine
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_dice_chooseLine.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.lineNo != null && message.hasOwnProperty("lineNo"))
                if (!$util.isInteger(message.lineNo))
                    return "lineNo: integer expected";
            return null;
        };

        return cs_dice_chooseLine;
    })();

    dice.sc_dice_chooseLine = (function() {

        /**
         * Properties of a sc_dice_chooseLine.
         * @memberof dice
         * @interface Isc_dice_chooseLine
         */

        /**
         * Constructs a new sc_dice_chooseLine.
         * @memberof dice
         * @classdesc Represents a sc_dice_chooseLine.
         * @implements Isc_dice_chooseLine
         * @constructor
         * @param {dice.Isc_dice_chooseLine=} [properties] Properties to set
         */
        function sc_dice_chooseLine(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new sc_dice_chooseLine instance using the specified properties.
         * @function create
         * @memberof dice.sc_dice_chooseLine
         * @static
         * @param {dice.Isc_dice_chooseLine=} [properties] Properties to set
         * @returns {dice.sc_dice_chooseLine} sc_dice_chooseLine instance
         */
        sc_dice_chooseLine.create = function create(properties) {
            return new sc_dice_chooseLine(properties);
        };

        /**
         * Encodes the specified sc_dice_chooseLine message. Does not implicitly {@link dice.sc_dice_chooseLine.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_dice_chooseLine
         * @static
         * @param {dice.Isc_dice_chooseLine} message sc_dice_chooseLine message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_dice_chooseLine.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified sc_dice_chooseLine message, length delimited. Does not implicitly {@link dice.sc_dice_chooseLine.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_dice_chooseLine
         * @static
         * @param {dice.Isc_dice_chooseLine} message sc_dice_chooseLine message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_dice_chooseLine.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_dice_chooseLine message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_dice_chooseLine
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_dice_chooseLine} sc_dice_chooseLine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_dice_chooseLine.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_dice_chooseLine();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_dice_chooseLine message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_dice_chooseLine
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_dice_chooseLine} sc_dice_chooseLine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_dice_chooseLine.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_dice_chooseLine message.
         * @function verify
         * @memberof dice.sc_dice_chooseLine
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_dice_chooseLine.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return sc_dice_chooseLine;
    })();

    dice.cs_dice_buySkin = (function() {

        /**
         * Properties of a cs_dice_buySkin.
         * @memberof dice
         * @interface Ics_dice_buySkin
         * @property {string|null} [skinId] cs_dice_buySkin skinId
         */

        /**
         * Constructs a new cs_dice_buySkin.
         * @memberof dice
         * @classdesc Represents a cs_dice_buySkin.
         * @implements Ics_dice_buySkin
         * @constructor
         * @param {dice.Ics_dice_buySkin=} [properties] Properties to set
         */
        function cs_dice_buySkin(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_dice_buySkin skinId.
         * @member {string} skinId
         * @memberof dice.cs_dice_buySkin
         * @instance
         */
        cs_dice_buySkin.prototype.skinId = "";

        /**
         * Creates a new cs_dice_buySkin instance using the specified properties.
         * @function create
         * @memberof dice.cs_dice_buySkin
         * @static
         * @param {dice.Ics_dice_buySkin=} [properties] Properties to set
         * @returns {dice.cs_dice_buySkin} cs_dice_buySkin instance
         */
        cs_dice_buySkin.create = function create(properties) {
            return new cs_dice_buySkin(properties);
        };

        /**
         * Encodes the specified cs_dice_buySkin message. Does not implicitly {@link dice.cs_dice_buySkin.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_dice_buySkin
         * @static
         * @param {dice.Ics_dice_buySkin} message cs_dice_buySkin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_dice_buySkin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.skinId != null && message.hasOwnProperty("skinId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.skinId);
            return writer;
        };

        /**
         * Encodes the specified cs_dice_buySkin message, length delimited. Does not implicitly {@link dice.cs_dice_buySkin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_dice_buySkin
         * @static
         * @param {dice.Ics_dice_buySkin} message cs_dice_buySkin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_dice_buySkin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_dice_buySkin message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_dice_buySkin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_dice_buySkin} cs_dice_buySkin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_dice_buySkin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_dice_buySkin();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.skinId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_dice_buySkin message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_dice_buySkin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_dice_buySkin} cs_dice_buySkin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_dice_buySkin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_dice_buySkin message.
         * @function verify
         * @memberof dice.cs_dice_buySkin
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_dice_buySkin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.skinId != null && message.hasOwnProperty("skinId"))
                if (!$util.isString(message.skinId))
                    return "skinId: string expected";
            return null;
        };

        return cs_dice_buySkin;
    })();

    dice.sc_dice_buySkin = (function() {

        /**
         * Properties of a sc_dice_buySkin.
         * @memberof dice
         * @interface Isc_dice_buySkin
         */

        /**
         * Constructs a new sc_dice_buySkin.
         * @memberof dice
         * @classdesc Represents a sc_dice_buySkin.
         * @implements Isc_dice_buySkin
         * @constructor
         * @param {dice.Isc_dice_buySkin=} [properties] Properties to set
         */
        function sc_dice_buySkin(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new sc_dice_buySkin instance using the specified properties.
         * @function create
         * @memberof dice.sc_dice_buySkin
         * @static
         * @param {dice.Isc_dice_buySkin=} [properties] Properties to set
         * @returns {dice.sc_dice_buySkin} sc_dice_buySkin instance
         */
        sc_dice_buySkin.create = function create(properties) {
            return new sc_dice_buySkin(properties);
        };

        /**
         * Encodes the specified sc_dice_buySkin message. Does not implicitly {@link dice.sc_dice_buySkin.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_dice_buySkin
         * @static
         * @param {dice.Isc_dice_buySkin} message sc_dice_buySkin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_dice_buySkin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified sc_dice_buySkin message, length delimited. Does not implicitly {@link dice.sc_dice_buySkin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_dice_buySkin
         * @static
         * @param {dice.Isc_dice_buySkin} message sc_dice_buySkin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_dice_buySkin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_dice_buySkin message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_dice_buySkin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_dice_buySkin} sc_dice_buySkin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_dice_buySkin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_dice_buySkin();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_dice_buySkin message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_dice_buySkin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_dice_buySkin} sc_dice_buySkin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_dice_buySkin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_dice_buySkin message.
         * @function verify
         * @memberof dice.sc_dice_buySkin
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_dice_buySkin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return sc_dice_buySkin;
    })();

    dice.cs_dice_chooseSkin = (function() {

        /**
         * Properties of a cs_dice_chooseSkin.
         * @memberof dice
         * @interface Ics_dice_chooseSkin
         * @property {string|null} [skinId] cs_dice_chooseSkin skinId
         */

        /**
         * Constructs a new cs_dice_chooseSkin.
         * @memberof dice
         * @classdesc Represents a cs_dice_chooseSkin.
         * @implements Ics_dice_chooseSkin
         * @constructor
         * @param {dice.Ics_dice_chooseSkin=} [properties] Properties to set
         */
        function cs_dice_chooseSkin(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_dice_chooseSkin skinId.
         * @member {string} skinId
         * @memberof dice.cs_dice_chooseSkin
         * @instance
         */
        cs_dice_chooseSkin.prototype.skinId = "";

        /**
         * Creates a new cs_dice_chooseSkin instance using the specified properties.
         * @function create
         * @memberof dice.cs_dice_chooseSkin
         * @static
         * @param {dice.Ics_dice_chooseSkin=} [properties] Properties to set
         * @returns {dice.cs_dice_chooseSkin} cs_dice_chooseSkin instance
         */
        cs_dice_chooseSkin.create = function create(properties) {
            return new cs_dice_chooseSkin(properties);
        };

        /**
         * Encodes the specified cs_dice_chooseSkin message. Does not implicitly {@link dice.cs_dice_chooseSkin.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_dice_chooseSkin
         * @static
         * @param {dice.Ics_dice_chooseSkin} message cs_dice_chooseSkin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_dice_chooseSkin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.skinId != null && message.hasOwnProperty("skinId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.skinId);
            return writer;
        };

        /**
         * Encodes the specified cs_dice_chooseSkin message, length delimited. Does not implicitly {@link dice.cs_dice_chooseSkin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_dice_chooseSkin
         * @static
         * @param {dice.Ics_dice_chooseSkin} message cs_dice_chooseSkin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_dice_chooseSkin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_dice_chooseSkin message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_dice_chooseSkin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_dice_chooseSkin} cs_dice_chooseSkin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_dice_chooseSkin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_dice_chooseSkin();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.skinId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_dice_chooseSkin message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_dice_chooseSkin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_dice_chooseSkin} cs_dice_chooseSkin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_dice_chooseSkin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_dice_chooseSkin message.
         * @function verify
         * @memberof dice.cs_dice_chooseSkin
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_dice_chooseSkin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.skinId != null && message.hasOwnProperty("skinId"))
                if (!$util.isString(message.skinId))
                    return "skinId: string expected";
            return null;
        };

        return cs_dice_chooseSkin;
    })();

    dice.sc_dice_chooseSkin = (function() {

        /**
         * Properties of a sc_dice_chooseSkin.
         * @memberof dice
         * @interface Isc_dice_chooseSkin
         */

        /**
         * Constructs a new sc_dice_chooseSkin.
         * @memberof dice
         * @classdesc Represents a sc_dice_chooseSkin.
         * @implements Isc_dice_chooseSkin
         * @constructor
         * @param {dice.Isc_dice_chooseSkin=} [properties] Properties to set
         */
        function sc_dice_chooseSkin(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new sc_dice_chooseSkin instance using the specified properties.
         * @function create
         * @memberof dice.sc_dice_chooseSkin
         * @static
         * @param {dice.Isc_dice_chooseSkin=} [properties] Properties to set
         * @returns {dice.sc_dice_chooseSkin} sc_dice_chooseSkin instance
         */
        sc_dice_chooseSkin.create = function create(properties) {
            return new sc_dice_chooseSkin(properties);
        };

        /**
         * Encodes the specified sc_dice_chooseSkin message. Does not implicitly {@link dice.sc_dice_chooseSkin.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_dice_chooseSkin
         * @static
         * @param {dice.Isc_dice_chooseSkin} message sc_dice_chooseSkin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_dice_chooseSkin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified sc_dice_chooseSkin message, length delimited. Does not implicitly {@link dice.sc_dice_chooseSkin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_dice_chooseSkin
         * @static
         * @param {dice.Isc_dice_chooseSkin} message sc_dice_chooseSkin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_dice_chooseSkin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_dice_chooseSkin message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_dice_chooseSkin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_dice_chooseSkin} sc_dice_chooseSkin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_dice_chooseSkin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_dice_chooseSkin();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_dice_chooseSkin message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_dice_chooseSkin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_dice_chooseSkin} sc_dice_chooseSkin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_dice_chooseSkin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_dice_chooseSkin message.
         * @function verify
         * @memberof dice.sc_dice_chooseSkin
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_dice_chooseSkin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return sc_dice_chooseSkin;
    })();

    dice.cs_mail_getmymaillist = (function() {

        /**
         * Properties of a cs_mail_getmymaillist.
         * @memberof dice
         * @interface Ics_mail_getmymaillist
         */

        /**
         * Constructs a new cs_mail_getmymaillist.
         * @memberof dice
         * @classdesc Represents a cs_mail_getmymaillist.
         * @implements Ics_mail_getmymaillist
         * @constructor
         * @param {dice.Ics_mail_getmymaillist=} [properties] Properties to set
         */
        function cs_mail_getmymaillist(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new cs_mail_getmymaillist instance using the specified properties.
         * @function create
         * @memberof dice.cs_mail_getmymaillist
         * @static
         * @param {dice.Ics_mail_getmymaillist=} [properties] Properties to set
         * @returns {dice.cs_mail_getmymaillist} cs_mail_getmymaillist instance
         */
        cs_mail_getmymaillist.create = function create(properties) {
            return new cs_mail_getmymaillist(properties);
        };

        /**
         * Encodes the specified cs_mail_getmymaillist message. Does not implicitly {@link dice.cs_mail_getmymaillist.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_mail_getmymaillist
         * @static
         * @param {dice.Ics_mail_getmymaillist} message cs_mail_getmymaillist message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_mail_getmymaillist.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified cs_mail_getmymaillist message, length delimited. Does not implicitly {@link dice.cs_mail_getmymaillist.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_mail_getmymaillist
         * @static
         * @param {dice.Ics_mail_getmymaillist} message cs_mail_getmymaillist message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_mail_getmymaillist.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_mail_getmymaillist message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_mail_getmymaillist
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_mail_getmymaillist} cs_mail_getmymaillist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_mail_getmymaillist.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_mail_getmymaillist();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_mail_getmymaillist message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_mail_getmymaillist
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_mail_getmymaillist} cs_mail_getmymaillist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_mail_getmymaillist.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_mail_getmymaillist message.
         * @function verify
         * @memberof dice.cs_mail_getmymaillist
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_mail_getmymaillist.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return cs_mail_getmymaillist;
    })();

    dice.sc_mail_getmymaillist = (function() {

        /**
         * Properties of a sc_mail_getmymaillist.
         * @memberof dice
         * @interface Isc_mail_getmymaillist
         */

        /**
         * Constructs a new sc_mail_getmymaillist.
         * @memberof dice
         * @classdesc Represents a sc_mail_getmymaillist.
         * @implements Isc_mail_getmymaillist
         * @constructor
         * @param {dice.Isc_mail_getmymaillist=} [properties] Properties to set
         */
        function sc_mail_getmymaillist(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new sc_mail_getmymaillist instance using the specified properties.
         * @function create
         * @memberof dice.sc_mail_getmymaillist
         * @static
         * @param {dice.Isc_mail_getmymaillist=} [properties] Properties to set
         * @returns {dice.sc_mail_getmymaillist} sc_mail_getmymaillist instance
         */
        sc_mail_getmymaillist.create = function create(properties) {
            return new sc_mail_getmymaillist(properties);
        };

        /**
         * Encodes the specified sc_mail_getmymaillist message. Does not implicitly {@link dice.sc_mail_getmymaillist.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_mail_getmymaillist
         * @static
         * @param {dice.Isc_mail_getmymaillist} message sc_mail_getmymaillist message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_mail_getmymaillist.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified sc_mail_getmymaillist message, length delimited. Does not implicitly {@link dice.sc_mail_getmymaillist.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_mail_getmymaillist
         * @static
         * @param {dice.Isc_mail_getmymaillist} message sc_mail_getmymaillist message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_mail_getmymaillist.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_mail_getmymaillist message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_mail_getmymaillist
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_mail_getmymaillist} sc_mail_getmymaillist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_mail_getmymaillist.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_mail_getmymaillist();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_mail_getmymaillist message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_mail_getmymaillist
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_mail_getmymaillist} sc_mail_getmymaillist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_mail_getmymaillist.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_mail_getmymaillist message.
         * @function verify
         * @memberof dice.sc_mail_getmymaillist
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_mail_getmymaillist.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return sc_mail_getmymaillist;
    })();

    dice.cs_mail_getReward = (function() {

        /**
         * Properties of a cs_mail_getReward.
         * @memberof dice
         * @interface Ics_mail_getReward
         * @property {string|null} [mailId] cs_mail_getReward mailId
         */

        /**
         * Constructs a new cs_mail_getReward.
         * @memberof dice
         * @classdesc Represents a cs_mail_getReward.
         * @implements Ics_mail_getReward
         * @constructor
         * @param {dice.Ics_mail_getReward=} [properties] Properties to set
         */
        function cs_mail_getReward(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_mail_getReward mailId.
         * @member {string} mailId
         * @memberof dice.cs_mail_getReward
         * @instance
         */
        cs_mail_getReward.prototype.mailId = "";

        /**
         * Creates a new cs_mail_getReward instance using the specified properties.
         * @function create
         * @memberof dice.cs_mail_getReward
         * @static
         * @param {dice.Ics_mail_getReward=} [properties] Properties to set
         * @returns {dice.cs_mail_getReward} cs_mail_getReward instance
         */
        cs_mail_getReward.create = function create(properties) {
            return new cs_mail_getReward(properties);
        };

        /**
         * Encodes the specified cs_mail_getReward message. Does not implicitly {@link dice.cs_mail_getReward.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_mail_getReward
         * @static
         * @param {dice.Ics_mail_getReward} message cs_mail_getReward message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_mail_getReward.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.mailId != null && message.hasOwnProperty("mailId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.mailId);
            return writer;
        };

        /**
         * Encodes the specified cs_mail_getReward message, length delimited. Does not implicitly {@link dice.cs_mail_getReward.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_mail_getReward
         * @static
         * @param {dice.Ics_mail_getReward} message cs_mail_getReward message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_mail_getReward.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_mail_getReward message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_mail_getReward
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_mail_getReward} cs_mail_getReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_mail_getReward.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_mail_getReward();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.mailId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_mail_getReward message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_mail_getReward
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_mail_getReward} cs_mail_getReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_mail_getReward.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_mail_getReward message.
         * @function verify
         * @memberof dice.cs_mail_getReward
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_mail_getReward.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.mailId != null && message.hasOwnProperty("mailId"))
                if (!$util.isString(message.mailId))
                    return "mailId: string expected";
            return null;
        };

        return cs_mail_getReward;
    })();

    dice.sc_mail_getReward = (function() {

        /**
         * Properties of a sc_mail_getReward.
         * @memberof dice
         * @interface Isc_mail_getReward
         * @property {string|null} [rewards] sc_mail_getReward rewards
         */

        /**
         * Constructs a new sc_mail_getReward.
         * @memberof dice
         * @classdesc Represents a sc_mail_getReward.
         * @implements Isc_mail_getReward
         * @constructor
         * @param {dice.Isc_mail_getReward=} [properties] Properties to set
         */
        function sc_mail_getReward(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * sc_mail_getReward rewards.
         * @member {string} rewards
         * @memberof dice.sc_mail_getReward
         * @instance
         */
        sc_mail_getReward.prototype.rewards = "";

        /**
         * Creates a new sc_mail_getReward instance using the specified properties.
         * @function create
         * @memberof dice.sc_mail_getReward
         * @static
         * @param {dice.Isc_mail_getReward=} [properties] Properties to set
         * @returns {dice.sc_mail_getReward} sc_mail_getReward instance
         */
        sc_mail_getReward.create = function create(properties) {
            return new sc_mail_getReward(properties);
        };

        /**
         * Encodes the specified sc_mail_getReward message. Does not implicitly {@link dice.sc_mail_getReward.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_mail_getReward
         * @static
         * @param {dice.Isc_mail_getReward} message sc_mail_getReward message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_mail_getReward.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.rewards);
            return writer;
        };

        /**
         * Encodes the specified sc_mail_getReward message, length delimited. Does not implicitly {@link dice.sc_mail_getReward.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_mail_getReward
         * @static
         * @param {dice.Isc_mail_getReward} message sc_mail_getReward message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_mail_getReward.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_mail_getReward message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_mail_getReward
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_mail_getReward} sc_mail_getReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_mail_getReward.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_mail_getReward();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.rewards = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_mail_getReward message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_mail_getReward
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_mail_getReward} sc_mail_getReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_mail_getReward.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_mail_getReward message.
         * @function verify
         * @memberof dice.sc_mail_getReward
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_mail_getReward.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                if (!$util.isString(message.rewards))
                    return "rewards: string expected";
            return null;
        };

        return sc_mail_getReward;
    })();

    dice.cs_pay_processpayment = (function() {

        /**
         * Properties of a cs_pay_processpayment.
         * @memberof dice
         * @interface Ics_pay_processpayment
         * @property {string|null} [order_id] cs_pay_processpayment order_id
         * @property {string|null} [name] cs_pay_processpayment name
         */

        /**
         * Constructs a new cs_pay_processpayment.
         * @memberof dice
         * @classdesc Represents a cs_pay_processpayment.
         * @implements Ics_pay_processpayment
         * @constructor
         * @param {dice.Ics_pay_processpayment=} [properties] Properties to set
         */
        function cs_pay_processpayment(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_pay_processpayment order_id.
         * @member {string} order_id
         * @memberof dice.cs_pay_processpayment
         * @instance
         */
        cs_pay_processpayment.prototype.order_id = "";

        /**
         * cs_pay_processpayment name.
         * @member {string} name
         * @memberof dice.cs_pay_processpayment
         * @instance
         */
        cs_pay_processpayment.prototype.name = "";

        /**
         * Creates a new cs_pay_processpayment instance using the specified properties.
         * @function create
         * @memberof dice.cs_pay_processpayment
         * @static
         * @param {dice.Ics_pay_processpayment=} [properties] Properties to set
         * @returns {dice.cs_pay_processpayment} cs_pay_processpayment instance
         */
        cs_pay_processpayment.create = function create(properties) {
            return new cs_pay_processpayment(properties);
        };

        /**
         * Encodes the specified cs_pay_processpayment message. Does not implicitly {@link dice.cs_pay_processpayment.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_pay_processpayment
         * @static
         * @param {dice.Ics_pay_processpayment} message cs_pay_processpayment message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_pay_processpayment.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.order_id != null && message.hasOwnProperty("order_id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.order_id);
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            return writer;
        };

        /**
         * Encodes the specified cs_pay_processpayment message, length delimited. Does not implicitly {@link dice.cs_pay_processpayment.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_pay_processpayment
         * @static
         * @param {dice.Ics_pay_processpayment} message cs_pay_processpayment message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_pay_processpayment.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_pay_processpayment message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_pay_processpayment
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_pay_processpayment} cs_pay_processpayment
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_pay_processpayment.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_pay_processpayment();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.order_id = reader.string();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_pay_processpayment message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_pay_processpayment
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_pay_processpayment} cs_pay_processpayment
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_pay_processpayment.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_pay_processpayment message.
         * @function verify
         * @memberof dice.cs_pay_processpayment
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_pay_processpayment.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.order_id != null && message.hasOwnProperty("order_id"))
                if (!$util.isString(message.order_id))
                    return "order_id: string expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            return null;
        };

        return cs_pay_processpayment;
    })();

    dice.sc_pay_processpayment = (function() {

        /**
         * Properties of a sc_pay_processpayment.
         * @memberof dice
         * @interface Isc_pay_processpayment
         */

        /**
         * Constructs a new sc_pay_processpayment.
         * @memberof dice
         * @classdesc Represents a sc_pay_processpayment.
         * @implements Isc_pay_processpayment
         * @constructor
         * @param {dice.Isc_pay_processpayment=} [properties] Properties to set
         */
        function sc_pay_processpayment(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new sc_pay_processpayment instance using the specified properties.
         * @function create
         * @memberof dice.sc_pay_processpayment
         * @static
         * @param {dice.Isc_pay_processpayment=} [properties] Properties to set
         * @returns {dice.sc_pay_processpayment} sc_pay_processpayment instance
         */
        sc_pay_processpayment.create = function create(properties) {
            return new sc_pay_processpayment(properties);
        };

        /**
         * Encodes the specified sc_pay_processpayment message. Does not implicitly {@link dice.sc_pay_processpayment.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_pay_processpayment
         * @static
         * @param {dice.Isc_pay_processpayment} message sc_pay_processpayment message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_pay_processpayment.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified sc_pay_processpayment message, length delimited. Does not implicitly {@link dice.sc_pay_processpayment.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_pay_processpayment
         * @static
         * @param {dice.Isc_pay_processpayment} message sc_pay_processpayment message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_pay_processpayment.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_pay_processpayment message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_pay_processpayment
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_pay_processpayment} sc_pay_processpayment
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_pay_processpayment.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_pay_processpayment();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_pay_processpayment message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_pay_processpayment
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_pay_processpayment} sc_pay_processpayment
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_pay_processpayment.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_pay_processpayment message.
         * @function verify
         * @memberof dice.sc_pay_processpayment
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_pay_processpayment.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return sc_pay_processpayment;
    })();

    dice.sc_push_pay = (function() {

        /**
         * Properties of a sc_push_pay.
         * @memberof dice
         * @interface Isc_push_pay
         * @property {string|null} [rewards] sc_push_pay rewards
         * @property {dice.sc_push_pay.IPayment|null} [payment] sc_push_pay payment
         */

        /**
         * Constructs a new sc_push_pay.
         * @memberof dice
         * @classdesc Represents a sc_push_pay.
         * @implements Isc_push_pay
         * @constructor
         * @param {dice.Isc_push_pay=} [properties] Properties to set
         */
        function sc_push_pay(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * sc_push_pay rewards.
         * @member {string} rewards
         * @memberof dice.sc_push_pay
         * @instance
         */
        sc_push_pay.prototype.rewards = "";

        /**
         * sc_push_pay payment.
         * @member {dice.sc_push_pay.IPayment|null|undefined} payment
         * @memberof dice.sc_push_pay
         * @instance
         */
        sc_push_pay.prototype.payment = null;

        /**
         * Creates a new sc_push_pay instance using the specified properties.
         * @function create
         * @memberof dice.sc_push_pay
         * @static
         * @param {dice.Isc_push_pay=} [properties] Properties to set
         * @returns {dice.sc_push_pay} sc_push_pay instance
         */
        sc_push_pay.create = function create(properties) {
            return new sc_push_pay(properties);
        };

        /**
         * Encodes the specified sc_push_pay message. Does not implicitly {@link dice.sc_push_pay.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_push_pay
         * @static
         * @param {dice.Isc_push_pay} message sc_push_pay message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_push_pay.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.rewards);
            if (message.payment != null && message.hasOwnProperty("payment"))
                $root.dice.sc_push_pay.Payment.encode(message.payment, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified sc_push_pay message, length delimited. Does not implicitly {@link dice.sc_push_pay.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_push_pay
         * @static
         * @param {dice.Isc_push_pay} message sc_push_pay message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_push_pay.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_push_pay message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_push_pay
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_push_pay} sc_push_pay
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_push_pay.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_push_pay();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.rewards = reader.string();
                    break;
                case 2:
                    message.payment = $root.dice.sc_push_pay.Payment.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_push_pay message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_push_pay
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_push_pay} sc_push_pay
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_push_pay.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_push_pay message.
         * @function verify
         * @memberof dice.sc_push_pay
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_push_pay.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                if (!$util.isString(message.rewards))
                    return "rewards: string expected";
            if (message.payment != null && message.hasOwnProperty("payment")) {
                var error = $root.dice.sc_push_pay.Payment.verify(message.payment);
                if (error)
                    return "payment." + error;
            }
            return null;
        };

        sc_push_pay.Payment = (function() {

            /**
             * Properties of a Payment.
             * @memberof dice.sc_push_pay
             * @interface IPayment
             * @property {string|null} [itemId] Payment itemId
             * @property {number|null} [num] Payment num
             * @property {string|null} [orderId] Payment orderId
             * @property {string|null} [amount] Payment amount
             * @property {number|null} [extra_num] Payment extra_num
             */

            /**
             * Constructs a new Payment.
             * @memberof dice.sc_push_pay
             * @classdesc Represents a Payment.
             * @implements IPayment
             * @constructor
             * @param {dice.sc_push_pay.IPayment=} [properties] Properties to set
             */
            function Payment(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Payment itemId.
             * @member {string} itemId
             * @memberof dice.sc_push_pay.Payment
             * @instance
             */
            Payment.prototype.itemId = "";

            /**
             * Payment num.
             * @member {number} num
             * @memberof dice.sc_push_pay.Payment
             * @instance
             */
            Payment.prototype.num = 0;

            /**
             * Payment orderId.
             * @member {string} orderId
             * @memberof dice.sc_push_pay.Payment
             * @instance
             */
            Payment.prototype.orderId = "";

            /**
             * Payment amount.
             * @member {string} amount
             * @memberof dice.sc_push_pay.Payment
             * @instance
             */
            Payment.prototype.amount = "";

            /**
             * Payment extra_num.
             * @member {number} extra_num
             * @memberof dice.sc_push_pay.Payment
             * @instance
             */
            Payment.prototype.extra_num = 0;

            /**
             * Creates a new Payment instance using the specified properties.
             * @function create
             * @memberof dice.sc_push_pay.Payment
             * @static
             * @param {dice.sc_push_pay.IPayment=} [properties] Properties to set
             * @returns {dice.sc_push_pay.Payment} Payment instance
             */
            Payment.create = function create(properties) {
                return new Payment(properties);
            };

            /**
             * Encodes the specified Payment message. Does not implicitly {@link dice.sc_push_pay.Payment.verify|verify} messages.
             * @function encode
             * @memberof dice.sc_push_pay.Payment
             * @static
             * @param {dice.sc_push_pay.IPayment} message Payment message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Payment.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.itemId != null && message.hasOwnProperty("itemId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.itemId);
                if (message.num != null && message.hasOwnProperty("num"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.num);
                if (message.orderId != null && message.hasOwnProperty("orderId"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.orderId);
                if (message.amount != null && message.hasOwnProperty("amount"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.amount);
                if (message.extra_num != null && message.hasOwnProperty("extra_num"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.extra_num);
                return writer;
            };

            /**
             * Encodes the specified Payment message, length delimited. Does not implicitly {@link dice.sc_push_pay.Payment.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dice.sc_push_pay.Payment
             * @static
             * @param {dice.sc_push_pay.IPayment} message Payment message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Payment.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Payment message from the specified reader or buffer.
             * @function decode
             * @memberof dice.sc_push_pay.Payment
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dice.sc_push_pay.Payment} Payment
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Payment.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_push_pay.Payment();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.itemId = reader.string();
                        break;
                    case 2:
                        message.num = reader.int32();
                        break;
                    case 3:
                        message.orderId = reader.string();
                        break;
                    case 4:
                        message.amount = reader.string();
                        break;
                    case 5:
                        message.extra_num = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Payment message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dice.sc_push_pay.Payment
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dice.sc_push_pay.Payment} Payment
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Payment.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Payment message.
             * @function verify
             * @memberof dice.sc_push_pay.Payment
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Payment.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.itemId != null && message.hasOwnProperty("itemId"))
                    if (!$util.isString(message.itemId))
                        return "itemId: string expected";
                if (message.num != null && message.hasOwnProperty("num"))
                    if (!$util.isInteger(message.num))
                        return "num: integer expected";
                if (message.orderId != null && message.hasOwnProperty("orderId"))
                    if (!$util.isString(message.orderId))
                        return "orderId: string expected";
                if (message.amount != null && message.hasOwnProperty("amount"))
                    if (!$util.isString(message.amount))
                        return "amount: string expected";
                if (message.extra_num != null && message.hasOwnProperty("extra_num"))
                    if (!$util.isInteger(message.extra_num))
                        return "extra_num: integer expected";
                return null;
            };

            return Payment;
        })();

        return sc_push_pay;
    })();

    dice.sc_push_inviteFriend = (function() {

        /**
         * Properties of a sc_push_inviteFriend.
         * @memberof dice
         * @interface Isc_push_inviteFriend
         */

        /**
         * Constructs a new sc_push_inviteFriend.
         * @memberof dice
         * @classdesc Represents a sc_push_inviteFriend.
         * @implements Isc_push_inviteFriend
         * @constructor
         * @param {dice.Isc_push_inviteFriend=} [properties] Properties to set
         */
        function sc_push_inviteFriend(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new sc_push_inviteFriend instance using the specified properties.
         * @function create
         * @memberof dice.sc_push_inviteFriend
         * @static
         * @param {dice.Isc_push_inviteFriend=} [properties] Properties to set
         * @returns {dice.sc_push_inviteFriend} sc_push_inviteFriend instance
         */
        sc_push_inviteFriend.create = function create(properties) {
            return new sc_push_inviteFriend(properties);
        };

        /**
         * Encodes the specified sc_push_inviteFriend message. Does not implicitly {@link dice.sc_push_inviteFriend.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_push_inviteFriend
         * @static
         * @param {dice.Isc_push_inviteFriend} message sc_push_inviteFriend message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_push_inviteFriend.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified sc_push_inviteFriend message, length delimited. Does not implicitly {@link dice.sc_push_inviteFriend.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_push_inviteFriend
         * @static
         * @param {dice.Isc_push_inviteFriend} message sc_push_inviteFriend message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_push_inviteFriend.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_push_inviteFriend message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_push_inviteFriend
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_push_inviteFriend} sc_push_inviteFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_push_inviteFriend.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_push_inviteFriend();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_push_inviteFriend message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_push_inviteFriend
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_push_inviteFriend} sc_push_inviteFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_push_inviteFriend.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_push_inviteFriend message.
         * @function verify
         * @memberof dice.sc_push_inviteFriend
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_push_inviteFriend.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return sc_push_inviteFriend;
    })();

    dice.cs_rank_getPvp = (function() {

        /**
         * Properties of a cs_rank_getPvp.
         * @memberof dice
         * @interface Ics_rank_getPvp
         */

        /**
         * Constructs a new cs_rank_getPvp.
         * @memberof dice
         * @classdesc Represents a cs_rank_getPvp.
         * @implements Ics_rank_getPvp
         * @constructor
         * @param {dice.Ics_rank_getPvp=} [properties] Properties to set
         */
        function cs_rank_getPvp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new cs_rank_getPvp instance using the specified properties.
         * @function create
         * @memberof dice.cs_rank_getPvp
         * @static
         * @param {dice.Ics_rank_getPvp=} [properties] Properties to set
         * @returns {dice.cs_rank_getPvp} cs_rank_getPvp instance
         */
        cs_rank_getPvp.create = function create(properties) {
            return new cs_rank_getPvp(properties);
        };

        /**
         * Encodes the specified cs_rank_getPvp message. Does not implicitly {@link dice.cs_rank_getPvp.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_rank_getPvp
         * @static
         * @param {dice.Ics_rank_getPvp} message cs_rank_getPvp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_rank_getPvp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified cs_rank_getPvp message, length delimited. Does not implicitly {@link dice.cs_rank_getPvp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_rank_getPvp
         * @static
         * @param {dice.Ics_rank_getPvp} message cs_rank_getPvp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_rank_getPvp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_rank_getPvp message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_rank_getPvp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_rank_getPvp} cs_rank_getPvp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_rank_getPvp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_rank_getPvp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_rank_getPvp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_rank_getPvp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_rank_getPvp} cs_rank_getPvp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_rank_getPvp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_rank_getPvp message.
         * @function verify
         * @memberof dice.cs_rank_getPvp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_rank_getPvp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return cs_rank_getPvp;
    })();

    dice.sc_rank_getPvp = (function() {

        /**
         * Properties of a sc_rank_getPvp.
         * @memberof dice
         * @interface Isc_rank_getPvp
         * @property {Array.<dice.sc_rank_getPvp.IRankData>|null} [pvpRank] sc_rank_getPvp pvpRank
         */

        /**
         * Constructs a new sc_rank_getPvp.
         * @memberof dice
         * @classdesc Represents a sc_rank_getPvp.
         * @implements Isc_rank_getPvp
         * @constructor
         * @param {dice.Isc_rank_getPvp=} [properties] Properties to set
         */
        function sc_rank_getPvp(properties) {
            this.pvpRank = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * sc_rank_getPvp pvpRank.
         * @member {Array.<dice.sc_rank_getPvp.IRankData>} pvpRank
         * @memberof dice.sc_rank_getPvp
         * @instance
         */
        sc_rank_getPvp.prototype.pvpRank = $util.emptyArray;

        /**
         * Creates a new sc_rank_getPvp instance using the specified properties.
         * @function create
         * @memberof dice.sc_rank_getPvp
         * @static
         * @param {dice.Isc_rank_getPvp=} [properties] Properties to set
         * @returns {dice.sc_rank_getPvp} sc_rank_getPvp instance
         */
        sc_rank_getPvp.create = function create(properties) {
            return new sc_rank_getPvp(properties);
        };

        /**
         * Encodes the specified sc_rank_getPvp message. Does not implicitly {@link dice.sc_rank_getPvp.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_rank_getPvp
         * @static
         * @param {dice.Isc_rank_getPvp} message sc_rank_getPvp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_rank_getPvp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.pvpRank != null && message.pvpRank.length)
                for (var i = 0; i < message.pvpRank.length; ++i)
                    $root.dice.sc_rank_getPvp.RankData.encode(message.pvpRank[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified sc_rank_getPvp message, length delimited. Does not implicitly {@link dice.sc_rank_getPvp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_rank_getPvp
         * @static
         * @param {dice.Isc_rank_getPvp} message sc_rank_getPvp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_rank_getPvp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_rank_getPvp message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_rank_getPvp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_rank_getPvp} sc_rank_getPvp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_rank_getPvp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_rank_getPvp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.pvpRank && message.pvpRank.length))
                        message.pvpRank = [];
                    message.pvpRank.push($root.dice.sc_rank_getPvp.RankData.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_rank_getPvp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_rank_getPvp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_rank_getPvp} sc_rank_getPvp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_rank_getPvp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_rank_getPvp message.
         * @function verify
         * @memberof dice.sc_rank_getPvp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_rank_getPvp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.pvpRank != null && message.hasOwnProperty("pvpRank")) {
                if (!Array.isArray(message.pvpRank))
                    return "pvpRank: array expected";
                for (var i = 0; i < message.pvpRank.length; ++i) {
                    var error = $root.dice.sc_rank_getPvp.RankData.verify(message.pvpRank[i]);
                    if (error)
                        return "pvpRank." + error;
                }
            }
            return null;
        };

        sc_rank_getPvp.RankData = (function() {

            /**
             * Properties of a RankData.
             * @memberof dice.sc_rank_getPvp
             * @interface IRankData
             * @property {number|null} [value] RankData value
             * @property {number|null} [score] RankData score
             * @property {number|null} [level] RankData level
             * @property {string|null} [name] RankData name
             * @property {number|null} [uid] RankData uid
             * @property {Array.<dice.sc_rank_getPvp.RankData.ILineModelInfo>|null} [line] RankData line
             */

            /**
             * Constructs a new RankData.
             * @memberof dice.sc_rank_getPvp
             * @classdesc Represents a RankData.
             * @implements IRankData
             * @constructor
             * @param {dice.sc_rank_getPvp.IRankData=} [properties] Properties to set
             */
            function RankData(properties) {
                this.line = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RankData value.
             * @member {number} value
             * @memberof dice.sc_rank_getPvp.RankData
             * @instance
             */
            RankData.prototype.value = 0;

            /**
             * RankData score.
             * @member {number} score
             * @memberof dice.sc_rank_getPvp.RankData
             * @instance
             */
            RankData.prototype.score = 0;

            /**
             * RankData level.
             * @member {number} level
             * @memberof dice.sc_rank_getPvp.RankData
             * @instance
             */
            RankData.prototype.level = 0;

            /**
             * RankData name.
             * @member {string} name
             * @memberof dice.sc_rank_getPvp.RankData
             * @instance
             */
            RankData.prototype.name = "";

            /**
             * RankData uid.
             * @member {number} uid
             * @memberof dice.sc_rank_getPvp.RankData
             * @instance
             */
            RankData.prototype.uid = 0;

            /**
             * RankData line.
             * @member {Array.<dice.sc_rank_getPvp.RankData.ILineModelInfo>} line
             * @memberof dice.sc_rank_getPvp.RankData
             * @instance
             */
            RankData.prototype.line = $util.emptyArray;

            /**
             * Creates a new RankData instance using the specified properties.
             * @function create
             * @memberof dice.sc_rank_getPvp.RankData
             * @static
             * @param {dice.sc_rank_getPvp.IRankData=} [properties] Properties to set
             * @returns {dice.sc_rank_getPvp.RankData} RankData instance
             */
            RankData.create = function create(properties) {
                return new RankData(properties);
            };

            /**
             * Encodes the specified RankData message. Does not implicitly {@link dice.sc_rank_getPvp.RankData.verify|verify} messages.
             * @function encode
             * @memberof dice.sc_rank_getPvp.RankData
             * @static
             * @param {dice.sc_rank_getPvp.IRankData} message RankData message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RankData.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.value);
                if (message.score != null && message.hasOwnProperty("score"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.score);
                if (message.level != null && message.hasOwnProperty("level"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.level);
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.name);
                if (message.uid != null && message.hasOwnProperty("uid"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.uid);
                if (message.line != null && message.line.length)
                    for (var i = 0; i < message.line.length; ++i)
                        $root.dice.sc_rank_getPvp.RankData.LineModelInfo.encode(message.line[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified RankData message, length delimited. Does not implicitly {@link dice.sc_rank_getPvp.RankData.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dice.sc_rank_getPvp.RankData
             * @static
             * @param {dice.sc_rank_getPvp.IRankData} message RankData message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RankData.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RankData message from the specified reader or buffer.
             * @function decode
             * @memberof dice.sc_rank_getPvp.RankData
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dice.sc_rank_getPvp.RankData} RankData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RankData.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_rank_getPvp.RankData();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.value = reader.int32();
                        break;
                    case 2:
                        message.score = reader.int32();
                        break;
                    case 3:
                        message.level = reader.int32();
                        break;
                    case 4:
                        message.name = reader.string();
                        break;
                    case 5:
                        message.uid = reader.int32();
                        break;
                    case 6:
                        if (!(message.line && message.line.length))
                            message.line = [];
                        message.line.push($root.dice.sc_rank_getPvp.RankData.LineModelInfo.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a RankData message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dice.sc_rank_getPvp.RankData
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dice.sc_rank_getPvp.RankData} RankData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RankData.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RankData message.
             * @function verify
             * @memberof dice.sc_rank_getPvp.RankData
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RankData.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!$util.isInteger(message.value))
                        return "value: integer expected";
                if (message.score != null && message.hasOwnProperty("score"))
                    if (!$util.isInteger(message.score))
                        return "score: integer expected";
                if (message.level != null && message.hasOwnProperty("level"))
                    if (!$util.isInteger(message.level))
                        return "level: integer expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.uid != null && message.hasOwnProperty("uid"))
                    if (!$util.isInteger(message.uid))
                        return "uid: integer expected";
                if (message.line != null && message.hasOwnProperty("line")) {
                    if (!Array.isArray(message.line))
                        return "line: array expected";
                    for (var i = 0; i < message.line.length; ++i) {
                        var error = $root.dice.sc_rank_getPvp.RankData.LineModelInfo.verify(message.line[i]);
                        if (error)
                            return "line." + error;
                    }
                }
                return null;
            };

            RankData.LineModelInfo = (function() {

                /**
                 * Properties of a LineModelInfo.
                 * @memberof dice.sc_rank_getPvp.RankData
                 * @interface ILineModelInfo
                 * @property {string|null} [id] LineModelInfo id
                 */

                /**
                 * Constructs a new LineModelInfo.
                 * @memberof dice.sc_rank_getPvp.RankData
                 * @classdesc Represents a LineModelInfo.
                 * @implements ILineModelInfo
                 * @constructor
                 * @param {dice.sc_rank_getPvp.RankData.ILineModelInfo=} [properties] Properties to set
                 */
                function LineModelInfo(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * LineModelInfo id.
                 * @member {string} id
                 * @memberof dice.sc_rank_getPvp.RankData.LineModelInfo
                 * @instance
                 */
                LineModelInfo.prototype.id = "";

                /**
                 * Creates a new LineModelInfo instance using the specified properties.
                 * @function create
                 * @memberof dice.sc_rank_getPvp.RankData.LineModelInfo
                 * @static
                 * @param {dice.sc_rank_getPvp.RankData.ILineModelInfo=} [properties] Properties to set
                 * @returns {dice.sc_rank_getPvp.RankData.LineModelInfo} LineModelInfo instance
                 */
                LineModelInfo.create = function create(properties) {
                    return new LineModelInfo(properties);
                };

                /**
                 * Encodes the specified LineModelInfo message. Does not implicitly {@link dice.sc_rank_getPvp.RankData.LineModelInfo.verify|verify} messages.
                 * @function encode
                 * @memberof dice.sc_rank_getPvp.RankData.LineModelInfo
                 * @static
                 * @param {dice.sc_rank_getPvp.RankData.ILineModelInfo} message LineModelInfo message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                LineModelInfo.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && message.hasOwnProperty("id"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                    return writer;
                };

                /**
                 * Encodes the specified LineModelInfo message, length delimited. Does not implicitly {@link dice.sc_rank_getPvp.RankData.LineModelInfo.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof dice.sc_rank_getPvp.RankData.LineModelInfo
                 * @static
                 * @param {dice.sc_rank_getPvp.RankData.ILineModelInfo} message LineModelInfo message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                LineModelInfo.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a LineModelInfo message from the specified reader or buffer.
                 * @function decode
                 * @memberof dice.sc_rank_getPvp.RankData.LineModelInfo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {dice.sc_rank_getPvp.RankData.LineModelInfo} LineModelInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                LineModelInfo.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_rank_getPvp.RankData.LineModelInfo();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.id = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a LineModelInfo message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof dice.sc_rank_getPvp.RankData.LineModelInfo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {dice.sc_rank_getPvp.RankData.LineModelInfo} LineModelInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                LineModelInfo.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a LineModelInfo message.
                 * @function verify
                 * @memberof dice.sc_rank_getPvp.RankData.LineModelInfo
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                LineModelInfo.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isString(message.id))
                            return "id: string expected";
                    return null;
                };

                return LineModelInfo;
            })();

            return RankData;
        })();

        return sc_rank_getPvp;
    })();

    dice.cs_rank_getPve = (function() {

        /**
         * Properties of a cs_rank_getPve.
         * @memberof dice
         * @interface Ics_rank_getPve
         */

        /**
         * Constructs a new cs_rank_getPve.
         * @memberof dice
         * @classdesc Represents a cs_rank_getPve.
         * @implements Ics_rank_getPve
         * @constructor
         * @param {dice.Ics_rank_getPve=} [properties] Properties to set
         */
        function cs_rank_getPve(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new cs_rank_getPve instance using the specified properties.
         * @function create
         * @memberof dice.cs_rank_getPve
         * @static
         * @param {dice.Ics_rank_getPve=} [properties] Properties to set
         * @returns {dice.cs_rank_getPve} cs_rank_getPve instance
         */
        cs_rank_getPve.create = function create(properties) {
            return new cs_rank_getPve(properties);
        };

        /**
         * Encodes the specified cs_rank_getPve message. Does not implicitly {@link dice.cs_rank_getPve.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_rank_getPve
         * @static
         * @param {dice.Ics_rank_getPve} message cs_rank_getPve message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_rank_getPve.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified cs_rank_getPve message, length delimited. Does not implicitly {@link dice.cs_rank_getPve.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_rank_getPve
         * @static
         * @param {dice.Ics_rank_getPve} message cs_rank_getPve message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_rank_getPve.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_rank_getPve message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_rank_getPve
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_rank_getPve} cs_rank_getPve
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_rank_getPve.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_rank_getPve();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_rank_getPve message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_rank_getPve
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_rank_getPve} cs_rank_getPve
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_rank_getPve.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_rank_getPve message.
         * @function verify
         * @memberof dice.cs_rank_getPve
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_rank_getPve.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return cs_rank_getPve;
    })();

    dice.sc_rank_getPve = (function() {

        /**
         * Properties of a sc_rank_getPve.
         * @memberof dice
         * @interface Isc_rank_getPve
         * @property {Array.<dice.sc_rank_getPve.IRankData>|null} [pveRank] sc_rank_getPve pveRank
         */

        /**
         * Constructs a new sc_rank_getPve.
         * @memberof dice
         * @classdesc Represents a sc_rank_getPve.
         * @implements Isc_rank_getPve
         * @constructor
         * @param {dice.Isc_rank_getPve=} [properties] Properties to set
         */
        function sc_rank_getPve(properties) {
            this.pveRank = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * sc_rank_getPve pveRank.
         * @member {Array.<dice.sc_rank_getPve.IRankData>} pveRank
         * @memberof dice.sc_rank_getPve
         * @instance
         */
        sc_rank_getPve.prototype.pveRank = $util.emptyArray;

        /**
         * Creates a new sc_rank_getPve instance using the specified properties.
         * @function create
         * @memberof dice.sc_rank_getPve
         * @static
         * @param {dice.Isc_rank_getPve=} [properties] Properties to set
         * @returns {dice.sc_rank_getPve} sc_rank_getPve instance
         */
        sc_rank_getPve.create = function create(properties) {
            return new sc_rank_getPve(properties);
        };

        /**
         * Encodes the specified sc_rank_getPve message. Does not implicitly {@link dice.sc_rank_getPve.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_rank_getPve
         * @static
         * @param {dice.Isc_rank_getPve} message sc_rank_getPve message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_rank_getPve.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.pveRank != null && message.pveRank.length)
                for (var i = 0; i < message.pveRank.length; ++i)
                    $root.dice.sc_rank_getPve.RankData.encode(message.pveRank[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified sc_rank_getPve message, length delimited. Does not implicitly {@link dice.sc_rank_getPve.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_rank_getPve
         * @static
         * @param {dice.Isc_rank_getPve} message sc_rank_getPve message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_rank_getPve.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_rank_getPve message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_rank_getPve
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_rank_getPve} sc_rank_getPve
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_rank_getPve.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_rank_getPve();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.pveRank && message.pveRank.length))
                        message.pveRank = [];
                    message.pveRank.push($root.dice.sc_rank_getPve.RankData.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_rank_getPve message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_rank_getPve
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_rank_getPve} sc_rank_getPve
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_rank_getPve.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_rank_getPve message.
         * @function verify
         * @memberof dice.sc_rank_getPve
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_rank_getPve.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.pveRank != null && message.hasOwnProperty("pveRank")) {
                if (!Array.isArray(message.pveRank))
                    return "pveRank: array expected";
                for (var i = 0; i < message.pveRank.length; ++i) {
                    var error = $root.dice.sc_rank_getPve.RankData.verify(message.pveRank[i]);
                    if (error)
                        return "pveRank." + error;
                }
            }
            return null;
        };

        sc_rank_getPve.RankData = (function() {

            /**
             * Properties of a RankData.
             * @memberof dice.sc_rank_getPve
             * @interface IRankData
             * @property {number|null} [value] RankData value
             * @property {number|null} [score] RankData score
             * @property {number|null} [level] RankData level
             * @property {string|null} [name] RankData name
             * @property {number|null} [uid] RankData uid
             * @property {Array.<dice.sc_rank_getPve.RankData.ILineModelInfo>|null} [line] RankData line
             * @property {number|null} [fscore] RankData fscore
             * @property {number|null} [flevel] RankData flevel
             * @property {string|null} [fname] RankData fname
             * @property {number|null} [fuid] RankData fuid
             * @property {Array.<dice.sc_rank_getPve.RankData.ILineModelInfo>|null} [fline] RankData fline
             */

            /**
             * Constructs a new RankData.
             * @memberof dice.sc_rank_getPve
             * @classdesc Represents a RankData.
             * @implements IRankData
             * @constructor
             * @param {dice.sc_rank_getPve.IRankData=} [properties] Properties to set
             */
            function RankData(properties) {
                this.line = [];
                this.fline = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RankData value.
             * @member {number} value
             * @memberof dice.sc_rank_getPve.RankData
             * @instance
             */
            RankData.prototype.value = 0;

            /**
             * RankData score.
             * @member {number} score
             * @memberof dice.sc_rank_getPve.RankData
             * @instance
             */
            RankData.prototype.score = 0;

            /**
             * RankData level.
             * @member {number} level
             * @memberof dice.sc_rank_getPve.RankData
             * @instance
             */
            RankData.prototype.level = 0;

            /**
             * RankData name.
             * @member {string} name
             * @memberof dice.sc_rank_getPve.RankData
             * @instance
             */
            RankData.prototype.name = "";

            /**
             * RankData uid.
             * @member {number} uid
             * @memberof dice.sc_rank_getPve.RankData
             * @instance
             */
            RankData.prototype.uid = 0;

            /**
             * RankData line.
             * @member {Array.<dice.sc_rank_getPve.RankData.ILineModelInfo>} line
             * @memberof dice.sc_rank_getPve.RankData
             * @instance
             */
            RankData.prototype.line = $util.emptyArray;

            /**
             * RankData fscore.
             * @member {number} fscore
             * @memberof dice.sc_rank_getPve.RankData
             * @instance
             */
            RankData.prototype.fscore = 0;

            /**
             * RankData flevel.
             * @member {number} flevel
             * @memberof dice.sc_rank_getPve.RankData
             * @instance
             */
            RankData.prototype.flevel = 0;

            /**
             * RankData fname.
             * @member {string} fname
             * @memberof dice.sc_rank_getPve.RankData
             * @instance
             */
            RankData.prototype.fname = "";

            /**
             * RankData fuid.
             * @member {number} fuid
             * @memberof dice.sc_rank_getPve.RankData
             * @instance
             */
            RankData.prototype.fuid = 0;

            /**
             * RankData fline.
             * @member {Array.<dice.sc_rank_getPve.RankData.ILineModelInfo>} fline
             * @memberof dice.sc_rank_getPve.RankData
             * @instance
             */
            RankData.prototype.fline = $util.emptyArray;

            /**
             * Creates a new RankData instance using the specified properties.
             * @function create
             * @memberof dice.sc_rank_getPve.RankData
             * @static
             * @param {dice.sc_rank_getPve.IRankData=} [properties] Properties to set
             * @returns {dice.sc_rank_getPve.RankData} RankData instance
             */
            RankData.create = function create(properties) {
                return new RankData(properties);
            };

            /**
             * Encodes the specified RankData message. Does not implicitly {@link dice.sc_rank_getPve.RankData.verify|verify} messages.
             * @function encode
             * @memberof dice.sc_rank_getPve.RankData
             * @static
             * @param {dice.sc_rank_getPve.IRankData} message RankData message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RankData.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.value);
                if (message.score != null && message.hasOwnProperty("score"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.score);
                if (message.level != null && message.hasOwnProperty("level"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.level);
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.name);
                if (message.uid != null && message.hasOwnProperty("uid"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.uid);
                if (message.line != null && message.line.length)
                    for (var i = 0; i < message.line.length; ++i)
                        $root.dice.sc_rank_getPve.RankData.LineModelInfo.encode(message.line[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                if (message.fscore != null && message.hasOwnProperty("fscore"))
                    writer.uint32(/* id 7, wireType 0 =*/56).int32(message.fscore);
                if (message.flevel != null && message.hasOwnProperty("flevel"))
                    writer.uint32(/* id 8, wireType 0 =*/64).int32(message.flevel);
                if (message.fname != null && message.hasOwnProperty("fname"))
                    writer.uint32(/* id 9, wireType 2 =*/74).string(message.fname);
                if (message.fuid != null && message.hasOwnProperty("fuid"))
                    writer.uint32(/* id 10, wireType 0 =*/80).int32(message.fuid);
                if (message.fline != null && message.fline.length)
                    for (var i = 0; i < message.fline.length; ++i)
                        $root.dice.sc_rank_getPve.RankData.LineModelInfo.encode(message.fline[i], writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified RankData message, length delimited. Does not implicitly {@link dice.sc_rank_getPve.RankData.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dice.sc_rank_getPve.RankData
             * @static
             * @param {dice.sc_rank_getPve.IRankData} message RankData message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RankData.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RankData message from the specified reader or buffer.
             * @function decode
             * @memberof dice.sc_rank_getPve.RankData
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dice.sc_rank_getPve.RankData} RankData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RankData.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_rank_getPve.RankData();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.value = reader.int32();
                        break;
                    case 2:
                        message.score = reader.int32();
                        break;
                    case 3:
                        message.level = reader.int32();
                        break;
                    case 4:
                        message.name = reader.string();
                        break;
                    case 5:
                        message.uid = reader.int32();
                        break;
                    case 6:
                        if (!(message.line && message.line.length))
                            message.line = [];
                        message.line.push($root.dice.sc_rank_getPve.RankData.LineModelInfo.decode(reader, reader.uint32()));
                        break;
                    case 7:
                        message.fscore = reader.int32();
                        break;
                    case 8:
                        message.flevel = reader.int32();
                        break;
                    case 9:
                        message.fname = reader.string();
                        break;
                    case 10:
                        message.fuid = reader.int32();
                        break;
                    case 11:
                        if (!(message.fline && message.fline.length))
                            message.fline = [];
                        message.fline.push($root.dice.sc_rank_getPve.RankData.LineModelInfo.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a RankData message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dice.sc_rank_getPve.RankData
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dice.sc_rank_getPve.RankData} RankData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RankData.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RankData message.
             * @function verify
             * @memberof dice.sc_rank_getPve.RankData
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RankData.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!$util.isInteger(message.value))
                        return "value: integer expected";
                if (message.score != null && message.hasOwnProperty("score"))
                    if (!$util.isInteger(message.score))
                        return "score: integer expected";
                if (message.level != null && message.hasOwnProperty("level"))
                    if (!$util.isInteger(message.level))
                        return "level: integer expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.uid != null && message.hasOwnProperty("uid"))
                    if (!$util.isInteger(message.uid))
                        return "uid: integer expected";
                if (message.line != null && message.hasOwnProperty("line")) {
                    if (!Array.isArray(message.line))
                        return "line: array expected";
                    for (var i = 0; i < message.line.length; ++i) {
                        var error = $root.dice.sc_rank_getPve.RankData.LineModelInfo.verify(message.line[i]);
                        if (error)
                            return "line." + error;
                    }
                }
                if (message.fscore != null && message.hasOwnProperty("fscore"))
                    if (!$util.isInteger(message.fscore))
                        return "fscore: integer expected";
                if (message.flevel != null && message.hasOwnProperty("flevel"))
                    if (!$util.isInteger(message.flevel))
                        return "flevel: integer expected";
                if (message.fname != null && message.hasOwnProperty("fname"))
                    if (!$util.isString(message.fname))
                        return "fname: string expected";
                if (message.fuid != null && message.hasOwnProperty("fuid"))
                    if (!$util.isInteger(message.fuid))
                        return "fuid: integer expected";
                if (message.fline != null && message.hasOwnProperty("fline")) {
                    if (!Array.isArray(message.fline))
                        return "fline: array expected";
                    for (var i = 0; i < message.fline.length; ++i) {
                        var error = $root.dice.sc_rank_getPve.RankData.LineModelInfo.verify(message.fline[i]);
                        if (error)
                            return "fline." + error;
                    }
                }
                return null;
            };

            RankData.LineModelInfo = (function() {

                /**
                 * Properties of a LineModelInfo.
                 * @memberof dice.sc_rank_getPve.RankData
                 * @interface ILineModelInfo
                 * @property {string|null} [id] LineModelInfo id
                 */

                /**
                 * Constructs a new LineModelInfo.
                 * @memberof dice.sc_rank_getPve.RankData
                 * @classdesc Represents a LineModelInfo.
                 * @implements ILineModelInfo
                 * @constructor
                 * @param {dice.sc_rank_getPve.RankData.ILineModelInfo=} [properties] Properties to set
                 */
                function LineModelInfo(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * LineModelInfo id.
                 * @member {string} id
                 * @memberof dice.sc_rank_getPve.RankData.LineModelInfo
                 * @instance
                 */
                LineModelInfo.prototype.id = "";

                /**
                 * Creates a new LineModelInfo instance using the specified properties.
                 * @function create
                 * @memberof dice.sc_rank_getPve.RankData.LineModelInfo
                 * @static
                 * @param {dice.sc_rank_getPve.RankData.ILineModelInfo=} [properties] Properties to set
                 * @returns {dice.sc_rank_getPve.RankData.LineModelInfo} LineModelInfo instance
                 */
                LineModelInfo.create = function create(properties) {
                    return new LineModelInfo(properties);
                };

                /**
                 * Encodes the specified LineModelInfo message. Does not implicitly {@link dice.sc_rank_getPve.RankData.LineModelInfo.verify|verify} messages.
                 * @function encode
                 * @memberof dice.sc_rank_getPve.RankData.LineModelInfo
                 * @static
                 * @param {dice.sc_rank_getPve.RankData.ILineModelInfo} message LineModelInfo message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                LineModelInfo.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && message.hasOwnProperty("id"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                    return writer;
                };

                /**
                 * Encodes the specified LineModelInfo message, length delimited. Does not implicitly {@link dice.sc_rank_getPve.RankData.LineModelInfo.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof dice.sc_rank_getPve.RankData.LineModelInfo
                 * @static
                 * @param {dice.sc_rank_getPve.RankData.ILineModelInfo} message LineModelInfo message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                LineModelInfo.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a LineModelInfo message from the specified reader or buffer.
                 * @function decode
                 * @memberof dice.sc_rank_getPve.RankData.LineModelInfo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {dice.sc_rank_getPve.RankData.LineModelInfo} LineModelInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                LineModelInfo.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_rank_getPve.RankData.LineModelInfo();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.id = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a LineModelInfo message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof dice.sc_rank_getPve.RankData.LineModelInfo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {dice.sc_rank_getPve.RankData.LineModelInfo} LineModelInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                LineModelInfo.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a LineModelInfo message.
                 * @function verify
                 * @memberof dice.sc_rank_getPve.RankData.LineModelInfo
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                LineModelInfo.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isString(message.id))
                            return "id: string expected";
                    return null;
                };

                return LineModelInfo;
            })();

            return RankData;
        })();

        return sc_rank_getPve;
    })();

    dice.cs_battle_find = (function() {

        /**
         * Properties of a cs_battle_find.
         * @memberof dice
         * @interface Ics_battle_find
         * @property {number|null} [findType] cs_battle_find findType
         * @property {number|null} [findNum] cs_battle_find findNum
         */

        /**
         * Constructs a new cs_battle_find.
         * @memberof dice
         * @classdesc Represents a cs_battle_find.
         * @implements Ics_battle_find
         * @constructor
         * @param {dice.Ics_battle_find=} [properties] Properties to set
         */
        function cs_battle_find(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_battle_find findType.
         * @member {number} findType
         * @memberof dice.cs_battle_find
         * @instance
         */
        cs_battle_find.prototype.findType = 0;

        /**
         * cs_battle_find findNum.
         * @member {number} findNum
         * @memberof dice.cs_battle_find
         * @instance
         */
        cs_battle_find.prototype.findNum = 0;

        /**
         * Creates a new cs_battle_find instance using the specified properties.
         * @function create
         * @memberof dice.cs_battle_find
         * @static
         * @param {dice.Ics_battle_find=} [properties] Properties to set
         * @returns {dice.cs_battle_find} cs_battle_find instance
         */
        cs_battle_find.create = function create(properties) {
            return new cs_battle_find(properties);
        };

        /**
         * Encodes the specified cs_battle_find message. Does not implicitly {@link dice.cs_battle_find.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_battle_find
         * @static
         * @param {dice.Ics_battle_find} message cs_battle_find message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_battle_find.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.findType != null && message.hasOwnProperty("findType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.findType);
            if (message.findNum != null && message.hasOwnProperty("findNum"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.findNum);
            return writer;
        };

        /**
         * Encodes the specified cs_battle_find message, length delimited. Does not implicitly {@link dice.cs_battle_find.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_battle_find
         * @static
         * @param {dice.Ics_battle_find} message cs_battle_find message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_battle_find.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_battle_find message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_battle_find
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_battle_find} cs_battle_find
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_battle_find.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_battle_find();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.findType = reader.int32();
                    break;
                case 2:
                    message.findNum = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_battle_find message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_battle_find
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_battle_find} cs_battle_find
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_battle_find.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_battle_find message.
         * @function verify
         * @memberof dice.cs_battle_find
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_battle_find.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.findType != null && message.hasOwnProperty("findType"))
                if (!$util.isInteger(message.findType))
                    return "findType: integer expected";
            if (message.findNum != null && message.hasOwnProperty("findNum"))
                if (!$util.isInteger(message.findNum))
                    return "findNum: integer expected";
            return null;
        };

        return cs_battle_find;
    })();

    dice.sc_battle_find = (function() {

        /**
         * Properties of a sc_battle_find.
         * @memberof dice
         * @interface Isc_battle_find
         * @property {number|null} [matchFlag] sc_battle_find matchFlag
         * @property {number|null} [randSeed] sc_battle_find randSeed
         */

        /**
         * Constructs a new sc_battle_find.
         * @memberof dice
         * @classdesc Represents a sc_battle_find.
         * @implements Isc_battle_find
         * @constructor
         * @param {dice.Isc_battle_find=} [properties] Properties to set
         */
        function sc_battle_find(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * sc_battle_find matchFlag.
         * @member {number} matchFlag
         * @memberof dice.sc_battle_find
         * @instance
         */
        sc_battle_find.prototype.matchFlag = 0;

        /**
         * sc_battle_find randSeed.
         * @member {number} randSeed
         * @memberof dice.sc_battle_find
         * @instance
         */
        sc_battle_find.prototype.randSeed = 0;

        /**
         * Creates a new sc_battle_find instance using the specified properties.
         * @function create
         * @memberof dice.sc_battle_find
         * @static
         * @param {dice.Isc_battle_find=} [properties] Properties to set
         * @returns {dice.sc_battle_find} sc_battle_find instance
         */
        sc_battle_find.create = function create(properties) {
            return new sc_battle_find(properties);
        };

        /**
         * Encodes the specified sc_battle_find message. Does not implicitly {@link dice.sc_battle_find.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_battle_find
         * @static
         * @param {dice.Isc_battle_find} message sc_battle_find message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_battle_find.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.matchFlag != null && message.hasOwnProperty("matchFlag"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.matchFlag);
            if (message.randSeed != null && message.hasOwnProperty("randSeed"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.randSeed);
            return writer;
        };

        /**
         * Encodes the specified sc_battle_find message, length delimited. Does not implicitly {@link dice.sc_battle_find.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_battle_find
         * @static
         * @param {dice.Isc_battle_find} message sc_battle_find message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_battle_find.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_battle_find message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_battle_find
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_battle_find} sc_battle_find
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_battle_find.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_battle_find();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.matchFlag = reader.int32();
                    break;
                case 2:
                    message.randSeed = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_battle_find message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_battle_find
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_battle_find} sc_battle_find
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_battle_find.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_battle_find message.
         * @function verify
         * @memberof dice.sc_battle_find
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_battle_find.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.matchFlag != null && message.hasOwnProperty("matchFlag"))
                if (!$util.isInteger(message.matchFlag))
                    return "matchFlag: integer expected";
            if (message.randSeed != null && message.hasOwnProperty("randSeed"))
                if (!$util.isInteger(message.randSeed))
                    return "randSeed: integer expected";
            return null;
        };

        return sc_battle_find;
    })();

    dice.cs_battle_cancelFind = (function() {

        /**
         * Properties of a cs_battle_cancelFind.
         * @memberof dice
         * @interface Ics_battle_cancelFind
         * @property {number|null} [findType] cs_battle_cancelFind findType
         */

        /**
         * Constructs a new cs_battle_cancelFind.
         * @memberof dice
         * @classdesc Represents a cs_battle_cancelFind.
         * @implements Ics_battle_cancelFind
         * @constructor
         * @param {dice.Ics_battle_cancelFind=} [properties] Properties to set
         */
        function cs_battle_cancelFind(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_battle_cancelFind findType.
         * @member {number} findType
         * @memberof dice.cs_battle_cancelFind
         * @instance
         */
        cs_battle_cancelFind.prototype.findType = 0;

        /**
         * Creates a new cs_battle_cancelFind instance using the specified properties.
         * @function create
         * @memberof dice.cs_battle_cancelFind
         * @static
         * @param {dice.Ics_battle_cancelFind=} [properties] Properties to set
         * @returns {dice.cs_battle_cancelFind} cs_battle_cancelFind instance
         */
        cs_battle_cancelFind.create = function create(properties) {
            return new cs_battle_cancelFind(properties);
        };

        /**
         * Encodes the specified cs_battle_cancelFind message. Does not implicitly {@link dice.cs_battle_cancelFind.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_battle_cancelFind
         * @static
         * @param {dice.Ics_battle_cancelFind} message cs_battle_cancelFind message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_battle_cancelFind.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.findType != null && message.hasOwnProperty("findType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.findType);
            return writer;
        };

        /**
         * Encodes the specified cs_battle_cancelFind message, length delimited. Does not implicitly {@link dice.cs_battle_cancelFind.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_battle_cancelFind
         * @static
         * @param {dice.Ics_battle_cancelFind} message cs_battle_cancelFind message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_battle_cancelFind.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_battle_cancelFind message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_battle_cancelFind
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_battle_cancelFind} cs_battle_cancelFind
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_battle_cancelFind.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_battle_cancelFind();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.findType = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_battle_cancelFind message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_battle_cancelFind
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_battle_cancelFind} cs_battle_cancelFind
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_battle_cancelFind.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_battle_cancelFind message.
         * @function verify
         * @memberof dice.cs_battle_cancelFind
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_battle_cancelFind.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.findType != null && message.hasOwnProperty("findType"))
                if (!$util.isInteger(message.findType))
                    return "findType: integer expected";
            return null;
        };

        return cs_battle_cancelFind;
    })();

    dice.sc_battle_cancelFind = (function() {

        /**
         * Properties of a sc_battle_cancelFind.
         * @memberof dice
         * @interface Isc_battle_cancelFind
         */

        /**
         * Constructs a new sc_battle_cancelFind.
         * @memberof dice
         * @classdesc Represents a sc_battle_cancelFind.
         * @implements Isc_battle_cancelFind
         * @constructor
         * @param {dice.Isc_battle_cancelFind=} [properties] Properties to set
         */
        function sc_battle_cancelFind(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new sc_battle_cancelFind instance using the specified properties.
         * @function create
         * @memberof dice.sc_battle_cancelFind
         * @static
         * @param {dice.Isc_battle_cancelFind=} [properties] Properties to set
         * @returns {dice.sc_battle_cancelFind} sc_battle_cancelFind instance
         */
        sc_battle_cancelFind.create = function create(properties) {
            return new sc_battle_cancelFind(properties);
        };

        /**
         * Encodes the specified sc_battle_cancelFind message. Does not implicitly {@link dice.sc_battle_cancelFind.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_battle_cancelFind
         * @static
         * @param {dice.Isc_battle_cancelFind} message sc_battle_cancelFind message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_battle_cancelFind.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified sc_battle_cancelFind message, length delimited. Does not implicitly {@link dice.sc_battle_cancelFind.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_battle_cancelFind
         * @static
         * @param {dice.Isc_battle_cancelFind} message sc_battle_cancelFind message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_battle_cancelFind.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_battle_cancelFind message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_battle_cancelFind
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_battle_cancelFind} sc_battle_cancelFind
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_battle_cancelFind.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_battle_cancelFind();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_battle_cancelFind message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_battle_cancelFind
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_battle_cancelFind} sc_battle_cancelFind
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_battle_cancelFind.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_battle_cancelFind message.
         * @function verify
         * @memberof dice.sc_battle_cancelFind
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_battle_cancelFind.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return sc_battle_cancelFind;
    })();

    dice.cs_battle_findFriend = (function() {

        /**
         * Properties of a cs_battle_findFriend.
         * @memberof dice
         * @interface Ics_battle_findFriend
         * @property {number|null} [findType] cs_battle_findFriend findType
         * @property {number|null} [findNum] cs_battle_findFriend findNum
         * @property {number|null} [isCreate] cs_battle_findFriend isCreate
         * @property {number|null} [passCode] cs_battle_findFriend passCode
         */

        /**
         * Constructs a new cs_battle_findFriend.
         * @memberof dice
         * @classdesc Represents a cs_battle_findFriend.
         * @implements Ics_battle_findFriend
         * @constructor
         * @param {dice.Ics_battle_findFriend=} [properties] Properties to set
         */
        function cs_battle_findFriend(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_battle_findFriend findType.
         * @member {number} findType
         * @memberof dice.cs_battle_findFriend
         * @instance
         */
        cs_battle_findFriend.prototype.findType = 0;

        /**
         * cs_battle_findFriend findNum.
         * @member {number} findNum
         * @memberof dice.cs_battle_findFriend
         * @instance
         */
        cs_battle_findFriend.prototype.findNum = 0;

        /**
         * cs_battle_findFriend isCreate.
         * @member {number} isCreate
         * @memberof dice.cs_battle_findFriend
         * @instance
         */
        cs_battle_findFriend.prototype.isCreate = 0;

        /**
         * cs_battle_findFriend passCode.
         * @member {number} passCode
         * @memberof dice.cs_battle_findFriend
         * @instance
         */
        cs_battle_findFriend.prototype.passCode = 0;

        /**
         * Creates a new cs_battle_findFriend instance using the specified properties.
         * @function create
         * @memberof dice.cs_battle_findFriend
         * @static
         * @param {dice.Ics_battle_findFriend=} [properties] Properties to set
         * @returns {dice.cs_battle_findFriend} cs_battle_findFriend instance
         */
        cs_battle_findFriend.create = function create(properties) {
            return new cs_battle_findFriend(properties);
        };

        /**
         * Encodes the specified cs_battle_findFriend message. Does not implicitly {@link dice.cs_battle_findFriend.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_battle_findFriend
         * @static
         * @param {dice.Ics_battle_findFriend} message cs_battle_findFriend message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_battle_findFriend.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.findType != null && message.hasOwnProperty("findType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.findType);
            if (message.findNum != null && message.hasOwnProperty("findNum"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.findNum);
            if (message.isCreate != null && message.hasOwnProperty("isCreate"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.isCreate);
            if (message.passCode != null && message.hasOwnProperty("passCode"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.passCode);
            return writer;
        };

        /**
         * Encodes the specified cs_battle_findFriend message, length delimited. Does not implicitly {@link dice.cs_battle_findFriend.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_battle_findFriend
         * @static
         * @param {dice.Ics_battle_findFriend} message cs_battle_findFriend message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_battle_findFriend.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_battle_findFriend message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_battle_findFriend
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_battle_findFriend} cs_battle_findFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_battle_findFriend.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_battle_findFriend();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.findType = reader.int32();
                    break;
                case 2:
                    message.findNum = reader.int32();
                    break;
                case 3:
                    message.isCreate = reader.int32();
                    break;
                case 4:
                    message.passCode = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_battle_findFriend message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_battle_findFriend
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_battle_findFriend} cs_battle_findFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_battle_findFriend.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_battle_findFriend message.
         * @function verify
         * @memberof dice.cs_battle_findFriend
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_battle_findFriend.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.findType != null && message.hasOwnProperty("findType"))
                if (!$util.isInteger(message.findType))
                    return "findType: integer expected";
            if (message.findNum != null && message.hasOwnProperty("findNum"))
                if (!$util.isInteger(message.findNum))
                    return "findNum: integer expected";
            if (message.isCreate != null && message.hasOwnProperty("isCreate"))
                if (!$util.isInteger(message.isCreate))
                    return "isCreate: integer expected";
            if (message.passCode != null && message.hasOwnProperty("passCode"))
                if (!$util.isInteger(message.passCode))
                    return "passCode: integer expected";
            return null;
        };

        return cs_battle_findFriend;
    })();

    dice.sc_battle_findFriend = (function() {

        /**
         * Properties of a sc_battle_findFriend.
         * @memberof dice
         * @interface Isc_battle_findFriend
         * @property {number|null} [matchFlag] sc_battle_findFriend matchFlag
         * @property {number|null} [showRoomId] sc_battle_findFriend showRoomId
         * @property {number|null} [noThisRoom] sc_battle_findFriend noThisRoom
         * @property {number|null} [randSeed] sc_battle_findFriend randSeed
         */

        /**
         * Constructs a new sc_battle_findFriend.
         * @memberof dice
         * @classdesc Represents a sc_battle_findFriend.
         * @implements Isc_battle_findFriend
         * @constructor
         * @param {dice.Isc_battle_findFriend=} [properties] Properties to set
         */
        function sc_battle_findFriend(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * sc_battle_findFriend matchFlag.
         * @member {number} matchFlag
         * @memberof dice.sc_battle_findFriend
         * @instance
         */
        sc_battle_findFriend.prototype.matchFlag = 0;

        /**
         * sc_battle_findFriend showRoomId.
         * @member {number} showRoomId
         * @memberof dice.sc_battle_findFriend
         * @instance
         */
        sc_battle_findFriend.prototype.showRoomId = 0;

        /**
         * sc_battle_findFriend noThisRoom.
         * @member {number} noThisRoom
         * @memberof dice.sc_battle_findFriend
         * @instance
         */
        sc_battle_findFriend.prototype.noThisRoom = 0;

        /**
         * sc_battle_findFriend randSeed.
         * @member {number} randSeed
         * @memberof dice.sc_battle_findFriend
         * @instance
         */
        sc_battle_findFriend.prototype.randSeed = 0;

        /**
         * Creates a new sc_battle_findFriend instance using the specified properties.
         * @function create
         * @memberof dice.sc_battle_findFriend
         * @static
         * @param {dice.Isc_battle_findFriend=} [properties] Properties to set
         * @returns {dice.sc_battle_findFriend} sc_battle_findFriend instance
         */
        sc_battle_findFriend.create = function create(properties) {
            return new sc_battle_findFriend(properties);
        };

        /**
         * Encodes the specified sc_battle_findFriend message. Does not implicitly {@link dice.sc_battle_findFriend.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_battle_findFriend
         * @static
         * @param {dice.Isc_battle_findFriend} message sc_battle_findFriend message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_battle_findFriend.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.matchFlag != null && message.hasOwnProperty("matchFlag"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.matchFlag);
            if (message.showRoomId != null && message.hasOwnProperty("showRoomId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.showRoomId);
            if (message.noThisRoom != null && message.hasOwnProperty("noThisRoom"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.noThisRoom);
            if (message.randSeed != null && message.hasOwnProperty("randSeed"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.randSeed);
            return writer;
        };

        /**
         * Encodes the specified sc_battle_findFriend message, length delimited. Does not implicitly {@link dice.sc_battle_findFriend.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_battle_findFriend
         * @static
         * @param {dice.Isc_battle_findFriend} message sc_battle_findFriend message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_battle_findFriend.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_battle_findFriend message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_battle_findFriend
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_battle_findFriend} sc_battle_findFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_battle_findFriend.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_battle_findFriend();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.matchFlag = reader.int32();
                    break;
                case 2:
                    message.showRoomId = reader.int32();
                    break;
                case 3:
                    message.noThisRoom = reader.int32();
                    break;
                case 4:
                    message.randSeed = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_battle_findFriend message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_battle_findFriend
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_battle_findFriend} sc_battle_findFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_battle_findFriend.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_battle_findFriend message.
         * @function verify
         * @memberof dice.sc_battle_findFriend
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_battle_findFriend.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.matchFlag != null && message.hasOwnProperty("matchFlag"))
                if (!$util.isInteger(message.matchFlag))
                    return "matchFlag: integer expected";
            if (message.showRoomId != null && message.hasOwnProperty("showRoomId"))
                if (!$util.isInteger(message.showRoomId))
                    return "showRoomId: integer expected";
            if (message.noThisRoom != null && message.hasOwnProperty("noThisRoom"))
                if (!$util.isInteger(message.noThisRoom))
                    return "noThisRoom: integer expected";
            if (message.randSeed != null && message.hasOwnProperty("randSeed"))
                if (!$util.isInteger(message.randSeed))
                    return "randSeed: integer expected";
            return null;
        };

        return sc_battle_findFriend;
    })();

    dice.cs_battle_cancelFindFriend = (function() {

        /**
         * Properties of a cs_battle_cancelFindFriend.
         * @memberof dice
         * @interface Ics_battle_cancelFindFriend
         * @property {number|null} [findType] cs_battle_cancelFindFriend findType
         */

        /**
         * Constructs a new cs_battle_cancelFindFriend.
         * @memberof dice
         * @classdesc Represents a cs_battle_cancelFindFriend.
         * @implements Ics_battle_cancelFindFriend
         * @constructor
         * @param {dice.Ics_battle_cancelFindFriend=} [properties] Properties to set
         */
        function cs_battle_cancelFindFriend(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_battle_cancelFindFriend findType.
         * @member {number} findType
         * @memberof dice.cs_battle_cancelFindFriend
         * @instance
         */
        cs_battle_cancelFindFriend.prototype.findType = 0;

        /**
         * Creates a new cs_battle_cancelFindFriend instance using the specified properties.
         * @function create
         * @memberof dice.cs_battle_cancelFindFriend
         * @static
         * @param {dice.Ics_battle_cancelFindFriend=} [properties] Properties to set
         * @returns {dice.cs_battle_cancelFindFriend} cs_battle_cancelFindFriend instance
         */
        cs_battle_cancelFindFriend.create = function create(properties) {
            return new cs_battle_cancelFindFriend(properties);
        };

        /**
         * Encodes the specified cs_battle_cancelFindFriend message. Does not implicitly {@link dice.cs_battle_cancelFindFriend.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_battle_cancelFindFriend
         * @static
         * @param {dice.Ics_battle_cancelFindFriend} message cs_battle_cancelFindFriend message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_battle_cancelFindFriend.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.findType != null && message.hasOwnProperty("findType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.findType);
            return writer;
        };

        /**
         * Encodes the specified cs_battle_cancelFindFriend message, length delimited. Does not implicitly {@link dice.cs_battle_cancelFindFriend.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_battle_cancelFindFriend
         * @static
         * @param {dice.Ics_battle_cancelFindFriend} message cs_battle_cancelFindFriend message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_battle_cancelFindFriend.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_battle_cancelFindFriend message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_battle_cancelFindFriend
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_battle_cancelFindFriend} cs_battle_cancelFindFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_battle_cancelFindFriend.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_battle_cancelFindFriend();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.findType = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_battle_cancelFindFriend message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_battle_cancelFindFriend
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_battle_cancelFindFriend} cs_battle_cancelFindFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_battle_cancelFindFriend.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_battle_cancelFindFriend message.
         * @function verify
         * @memberof dice.cs_battle_cancelFindFriend
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_battle_cancelFindFriend.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.findType != null && message.hasOwnProperty("findType"))
                if (!$util.isInteger(message.findType))
                    return "findType: integer expected";
            return null;
        };

        return cs_battle_cancelFindFriend;
    })();

    dice.sc_battle_cancelFindFriend = (function() {

        /**
         * Properties of a sc_battle_cancelFindFriend.
         * @memberof dice
         * @interface Isc_battle_cancelFindFriend
         */

        /**
         * Constructs a new sc_battle_cancelFindFriend.
         * @memberof dice
         * @classdesc Represents a sc_battle_cancelFindFriend.
         * @implements Isc_battle_cancelFindFriend
         * @constructor
         * @param {dice.Isc_battle_cancelFindFriend=} [properties] Properties to set
         */
        function sc_battle_cancelFindFriend(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new sc_battle_cancelFindFriend instance using the specified properties.
         * @function create
         * @memberof dice.sc_battle_cancelFindFriend
         * @static
         * @param {dice.Isc_battle_cancelFindFriend=} [properties] Properties to set
         * @returns {dice.sc_battle_cancelFindFriend} sc_battle_cancelFindFriend instance
         */
        sc_battle_cancelFindFriend.create = function create(properties) {
            return new sc_battle_cancelFindFriend(properties);
        };

        /**
         * Encodes the specified sc_battle_cancelFindFriend message. Does not implicitly {@link dice.sc_battle_cancelFindFriend.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_battle_cancelFindFriend
         * @static
         * @param {dice.Isc_battle_cancelFindFriend} message sc_battle_cancelFindFriend message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_battle_cancelFindFriend.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified sc_battle_cancelFindFriend message, length delimited. Does not implicitly {@link dice.sc_battle_cancelFindFriend.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_battle_cancelFindFriend
         * @static
         * @param {dice.Isc_battle_cancelFindFriend} message sc_battle_cancelFindFriend message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_battle_cancelFindFriend.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_battle_cancelFindFriend message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_battle_cancelFindFriend
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_battle_cancelFindFriend} sc_battle_cancelFindFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_battle_cancelFindFriend.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_battle_cancelFindFriend();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_battle_cancelFindFriend message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_battle_cancelFindFriend
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_battle_cancelFindFriend} sc_battle_cancelFindFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_battle_cancelFindFriend.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_battle_cancelFindFriend message.
         * @function verify
         * @memberof dice.sc_battle_cancelFindFriend
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_battle_cancelFindFriend.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return sc_battle_cancelFindFriend;
    })();

    dice.cs_battle_init = (function() {

        /**
         * Properties of a cs_battle_init.
         * @memberof dice
         * @interface Ics_battle_init
         */

        /**
         * Constructs a new cs_battle_init.
         * @memberof dice
         * @classdesc Represents a cs_battle_init.
         * @implements Ics_battle_init
         * @constructor
         * @param {dice.Ics_battle_init=} [properties] Properties to set
         */
        function cs_battle_init(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new cs_battle_init instance using the specified properties.
         * @function create
         * @memberof dice.cs_battle_init
         * @static
         * @param {dice.Ics_battle_init=} [properties] Properties to set
         * @returns {dice.cs_battle_init} cs_battle_init instance
         */
        cs_battle_init.create = function create(properties) {
            return new cs_battle_init(properties);
        };

        /**
         * Encodes the specified cs_battle_init message. Does not implicitly {@link dice.cs_battle_init.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_battle_init
         * @static
         * @param {dice.Ics_battle_init} message cs_battle_init message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_battle_init.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified cs_battle_init message, length delimited. Does not implicitly {@link dice.cs_battle_init.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_battle_init
         * @static
         * @param {dice.Ics_battle_init} message cs_battle_init message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_battle_init.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_battle_init message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_battle_init
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_battle_init} cs_battle_init
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_battle_init.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_battle_init();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_battle_init message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_battle_init
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_battle_init} cs_battle_init
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_battle_init.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_battle_init message.
         * @function verify
         * @memberof dice.cs_battle_init
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_battle_init.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return cs_battle_init;
    })();

    dice.sc_battle_init = (function() {

        /**
         * Properties of a sc_battle_init.
         * @memberof dice
         * @interface Isc_battle_init
         * @property {dice.sc_battle_init.IInitData|null} [initData] sc_battle_init initData
         * @property {number|Long|null} [startTime] sc_battle_init startTime
         */

        /**
         * Constructs a new sc_battle_init.
         * @memberof dice
         * @classdesc Represents a sc_battle_init.
         * @implements Isc_battle_init
         * @constructor
         * @param {dice.Isc_battle_init=} [properties] Properties to set
         */
        function sc_battle_init(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * sc_battle_init initData.
         * @member {dice.sc_battle_init.IInitData|null|undefined} initData
         * @memberof dice.sc_battle_init
         * @instance
         */
        sc_battle_init.prototype.initData = null;

        /**
         * sc_battle_init startTime.
         * @member {number|Long} startTime
         * @memberof dice.sc_battle_init
         * @instance
         */
        sc_battle_init.prototype.startTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new sc_battle_init instance using the specified properties.
         * @function create
         * @memberof dice.sc_battle_init
         * @static
         * @param {dice.Isc_battle_init=} [properties] Properties to set
         * @returns {dice.sc_battle_init} sc_battle_init instance
         */
        sc_battle_init.create = function create(properties) {
            return new sc_battle_init(properties);
        };

        /**
         * Encodes the specified sc_battle_init message. Does not implicitly {@link dice.sc_battle_init.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_battle_init
         * @static
         * @param {dice.Isc_battle_init} message sc_battle_init message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_battle_init.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.initData != null && message.hasOwnProperty("initData"))
                $root.dice.sc_battle_init.InitData.encode(message.initData, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.startTime != null && message.hasOwnProperty("startTime"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.startTime);
            return writer;
        };

        /**
         * Encodes the specified sc_battle_init message, length delimited. Does not implicitly {@link dice.sc_battle_init.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_battle_init
         * @static
         * @param {dice.Isc_battle_init} message sc_battle_init message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_battle_init.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_battle_init message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_battle_init
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_battle_init} sc_battle_init
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_battle_init.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_battle_init();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.initData = $root.dice.sc_battle_init.InitData.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.startTime = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_battle_init message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_battle_init
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_battle_init} sc_battle_init
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_battle_init.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_battle_init message.
         * @function verify
         * @memberof dice.sc_battle_init
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_battle_init.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.initData != null && message.hasOwnProperty("initData")) {
                var error = $root.dice.sc_battle_init.InitData.verify(message.initData);
                if (error)
                    return "initData." + error;
            }
            if (message.startTime != null && message.hasOwnProperty("startTime"))
                if (!$util.isInteger(message.startTime) && !(message.startTime && $util.isInteger(message.startTime.low) && $util.isInteger(message.startTime.high)))
                    return "startTime: integer|Long expected";
            return null;
        };

        sc_battle_init.InitData = (function() {

            /**
             * Properties of an InitData.
             * @memberof dice.sc_battle_init
             * @interface IInitData
             * @property {Object.<string,dice.sc_battle_init.IPlayer>|null} [player] InitData player
             * @property {number|null} [frame] InitData frame
             * @property {number|null} [isFriend] InitData isFriend
             */

            /**
             * Constructs a new InitData.
             * @memberof dice.sc_battle_init
             * @classdesc Represents an InitData.
             * @implements IInitData
             * @constructor
             * @param {dice.sc_battle_init.IInitData=} [properties] Properties to set
             */
            function InitData(properties) {
                this.player = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * InitData player.
             * @member {Object.<string,dice.sc_battle_init.IPlayer>} player
             * @memberof dice.sc_battle_init.InitData
             * @instance
             */
            InitData.prototype.player = $util.emptyObject;

            /**
             * InitData frame.
             * @member {number} frame
             * @memberof dice.sc_battle_init.InitData
             * @instance
             */
            InitData.prototype.frame = 0;

            /**
             * InitData isFriend.
             * @member {number} isFriend
             * @memberof dice.sc_battle_init.InitData
             * @instance
             */
            InitData.prototype.isFriend = 0;

            /**
             * Creates a new InitData instance using the specified properties.
             * @function create
             * @memberof dice.sc_battle_init.InitData
             * @static
             * @param {dice.sc_battle_init.IInitData=} [properties] Properties to set
             * @returns {dice.sc_battle_init.InitData} InitData instance
             */
            InitData.create = function create(properties) {
                return new InitData(properties);
            };

            /**
             * Encodes the specified InitData message. Does not implicitly {@link dice.sc_battle_init.InitData.verify|verify} messages.
             * @function encode
             * @memberof dice.sc_battle_init.InitData
             * @static
             * @param {dice.sc_battle_init.IInitData} message InitData message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            InitData.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.player != null && message.hasOwnProperty("player"))
                    for (var keys = Object.keys(message.player), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.dice.sc_battle_init.Player.encode(message.player[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                if (message.frame != null && message.hasOwnProperty("frame"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.frame);
                if (message.isFriend != null && message.hasOwnProperty("isFriend"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.isFriend);
                return writer;
            };

            /**
             * Encodes the specified InitData message, length delimited. Does not implicitly {@link dice.sc_battle_init.InitData.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dice.sc_battle_init.InitData
             * @static
             * @param {dice.sc_battle_init.IInitData} message InitData message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            InitData.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an InitData message from the specified reader or buffer.
             * @function decode
             * @memberof dice.sc_battle_init.InitData
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dice.sc_battle_init.InitData} InitData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            InitData.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_battle_init.InitData(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        reader.skip().pos++;
                        if (message.player === $util.emptyObject)
                            message.player = {};
                        key = reader.string();
                        reader.pos++;
                        message.player[key] = $root.dice.sc_battle_init.Player.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.frame = reader.int32();
                        break;
                    case 3:
                        message.isFriend = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an InitData message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dice.sc_battle_init.InitData
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dice.sc_battle_init.InitData} InitData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            InitData.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an InitData message.
             * @function verify
             * @memberof dice.sc_battle_init.InitData
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            InitData.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.player != null && message.hasOwnProperty("player")) {
                    if (!$util.isObject(message.player))
                        return "player: object expected";
                    var key = Object.keys(message.player);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.dice.sc_battle_init.Player.verify(message.player[key[i]]);
                        if (error)
                            return "player." + error;
                    }
                }
                if (message.frame != null && message.hasOwnProperty("frame"))
                    if (!$util.isInteger(message.frame))
                        return "frame: integer expected";
                if (message.isFriend != null && message.hasOwnProperty("isFriend"))
                    if (!$util.isInteger(message.isFriend))
                        return "isFriend: integer expected";
                return null;
            };

            return InitData;
        })();

        sc_battle_init.Player = (function() {

            /**
             * Properties of a Player.
             * @memberof dice.sc_battle_init
             * @interface IPlayer
             * @property {number|null} [uid] Player uid
             * @property {string|null} [name] Player name
             * @property {number|null} [level] Player level
             * @property {number|null} [win] Player win
             * @property {number|null} [lose] Player lose
             * @property {number|null} [score] Player score
             * @property {number|null} [crivalue] Player crivalue
             * @property {number|null} [zengfu] Player zengfu
             * @property {Array.<dice.sc_battle_init.IUpInfo>|null} [upInfo] Player upInfo
             * @property {string|null} [skin] Player skin
             * @property {number|null} [diceNum] Player diceNum
             * @property {number|null} [strategy] Player strategy
             */

            /**
             * Constructs a new Player.
             * @memberof dice.sc_battle_init
             * @classdesc Represents a Player.
             * @implements IPlayer
             * @constructor
             * @param {dice.sc_battle_init.IPlayer=} [properties] Properties to set
             */
            function Player(properties) {
                this.upInfo = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Player uid.
             * @member {number} uid
             * @memberof dice.sc_battle_init.Player
             * @instance
             */
            Player.prototype.uid = 0;

            /**
             * Player name.
             * @member {string} name
             * @memberof dice.sc_battle_init.Player
             * @instance
             */
            Player.prototype.name = "";

            /**
             * Player level.
             * @member {number} level
             * @memberof dice.sc_battle_init.Player
             * @instance
             */
            Player.prototype.level = 0;

            /**
             * Player win.
             * @member {number} win
             * @memberof dice.sc_battle_init.Player
             * @instance
             */
            Player.prototype.win = 0;

            /**
             * Player lose.
             * @member {number} lose
             * @memberof dice.sc_battle_init.Player
             * @instance
             */
            Player.prototype.lose = 0;

            /**
             * Player score.
             * @member {number} score
             * @memberof dice.sc_battle_init.Player
             * @instance
             */
            Player.prototype.score = 0;

            /**
             * Player crivalue.
             * @member {number} crivalue
             * @memberof dice.sc_battle_init.Player
             * @instance
             */
            Player.prototype.crivalue = 0;

            /**
             * Player zengfu.
             * @member {number} zengfu
             * @memberof dice.sc_battle_init.Player
             * @instance
             */
            Player.prototype.zengfu = 0;

            /**
             * Player upInfo.
             * @member {Array.<dice.sc_battle_init.IUpInfo>} upInfo
             * @memberof dice.sc_battle_init.Player
             * @instance
             */
            Player.prototype.upInfo = $util.emptyArray;

            /**
             * Player skin.
             * @member {string} skin
             * @memberof dice.sc_battle_init.Player
             * @instance
             */
            Player.prototype.skin = "";

            /**
             * Player diceNum.
             * @member {number} diceNum
             * @memberof dice.sc_battle_init.Player
             * @instance
             */
            Player.prototype.diceNum = 0;

            /**
             * Player strategy.
             * @member {number} strategy
             * @memberof dice.sc_battle_init.Player
             * @instance
             */
            Player.prototype.strategy = 0;

            /**
             * Creates a new Player instance using the specified properties.
             * @function create
             * @memberof dice.sc_battle_init.Player
             * @static
             * @param {dice.sc_battle_init.IPlayer=} [properties] Properties to set
             * @returns {dice.sc_battle_init.Player} Player instance
             */
            Player.create = function create(properties) {
                return new Player(properties);
            };

            /**
             * Encodes the specified Player message. Does not implicitly {@link dice.sc_battle_init.Player.verify|verify} messages.
             * @function encode
             * @memberof dice.sc_battle_init.Player
             * @static
             * @param {dice.sc_battle_init.IPlayer} message Player message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Player.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.uid != null && message.hasOwnProperty("uid"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uid);
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.level != null && message.hasOwnProperty("level"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.level);
                if (message.win != null && message.hasOwnProperty("win"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.win);
                if (message.lose != null && message.hasOwnProperty("lose"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.lose);
                if (message.score != null && message.hasOwnProperty("score"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.score);
                if (message.crivalue != null && message.hasOwnProperty("crivalue"))
                    writer.uint32(/* id 7, wireType 0 =*/56).int32(message.crivalue);
                if (message.zengfu != null && message.hasOwnProperty("zengfu"))
                    writer.uint32(/* id 8, wireType 0 =*/64).int32(message.zengfu);
                if (message.upInfo != null && message.upInfo.length)
                    for (var i = 0; i < message.upInfo.length; ++i)
                        $root.dice.sc_battle_init.UpInfo.encode(message.upInfo[i], writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
                if (message.skin != null && message.hasOwnProperty("skin"))
                    writer.uint32(/* id 10, wireType 2 =*/82).string(message.skin);
                if (message.diceNum != null && message.hasOwnProperty("diceNum"))
                    writer.uint32(/* id 11, wireType 0 =*/88).int32(message.diceNum);
                if (message.strategy != null && message.hasOwnProperty("strategy"))
                    writer.uint32(/* id 12, wireType 0 =*/96).int32(message.strategy);
                return writer;
            };

            /**
             * Encodes the specified Player message, length delimited. Does not implicitly {@link dice.sc_battle_init.Player.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dice.sc_battle_init.Player
             * @static
             * @param {dice.sc_battle_init.IPlayer} message Player message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Player.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Player message from the specified reader or buffer.
             * @function decode
             * @memberof dice.sc_battle_init.Player
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dice.sc_battle_init.Player} Player
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Player.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_battle_init.Player();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.uid = reader.int32();
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    case 3:
                        message.level = reader.int32();
                        break;
                    case 4:
                        message.win = reader.int32();
                        break;
                    case 5:
                        message.lose = reader.int32();
                        break;
                    case 6:
                        message.score = reader.int32();
                        break;
                    case 7:
                        message.crivalue = reader.int32();
                        break;
                    case 8:
                        message.zengfu = reader.int32();
                        break;
                    case 9:
                        if (!(message.upInfo && message.upInfo.length))
                            message.upInfo = [];
                        message.upInfo.push($root.dice.sc_battle_init.UpInfo.decode(reader, reader.uint32()));
                        break;
                    case 10:
                        message.skin = reader.string();
                        break;
                    case 11:
                        message.diceNum = reader.int32();
                        break;
                    case 12:
                        message.strategy = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Player message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dice.sc_battle_init.Player
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dice.sc_battle_init.Player} Player
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Player.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Player message.
             * @function verify
             * @memberof dice.sc_battle_init.Player
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Player.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.uid != null && message.hasOwnProperty("uid"))
                    if (!$util.isInteger(message.uid))
                        return "uid: integer expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.level != null && message.hasOwnProperty("level"))
                    if (!$util.isInteger(message.level))
                        return "level: integer expected";
                if (message.win != null && message.hasOwnProperty("win"))
                    if (!$util.isInteger(message.win))
                        return "win: integer expected";
                if (message.lose != null && message.hasOwnProperty("lose"))
                    if (!$util.isInteger(message.lose))
                        return "lose: integer expected";
                if (message.score != null && message.hasOwnProperty("score"))
                    if (!$util.isInteger(message.score))
                        return "score: integer expected";
                if (message.crivalue != null && message.hasOwnProperty("crivalue"))
                    if (!$util.isInteger(message.crivalue))
                        return "crivalue: integer expected";
                if (message.zengfu != null && message.hasOwnProperty("zengfu"))
                    if (!$util.isInteger(message.zengfu))
                        return "zengfu: integer expected";
                if (message.upInfo != null && message.hasOwnProperty("upInfo")) {
                    if (!Array.isArray(message.upInfo))
                        return "upInfo: array expected";
                    for (var i = 0; i < message.upInfo.length; ++i) {
                        var error = $root.dice.sc_battle_init.UpInfo.verify(message.upInfo[i]);
                        if (error)
                            return "upInfo." + error;
                    }
                }
                if (message.skin != null && message.hasOwnProperty("skin"))
                    if (!$util.isString(message.skin))
                        return "skin: string expected";
                if (message.diceNum != null && message.hasOwnProperty("diceNum"))
                    if (!$util.isInteger(message.diceNum))
                        return "diceNum: integer expected";
                if (message.strategy != null && message.hasOwnProperty("strategy"))
                    if (!$util.isInteger(message.strategy))
                        return "strategy: integer expected";
                return null;
            };

            return Player;
        })();

        sc_battle_init.UpInfo = (function() {

            /**
             * Properties of an UpInfo.
             * @memberof dice.sc_battle_init
             * @interface IUpInfo
             * @property {string|null} [id] UpInfo id
             * @property {number|null} [lv] UpInfo lv
             * @property {number|null} [pwlv] UpInfo pwlv
             */

            /**
             * Constructs a new UpInfo.
             * @memberof dice.sc_battle_init
             * @classdesc Represents an UpInfo.
             * @implements IUpInfo
             * @constructor
             * @param {dice.sc_battle_init.IUpInfo=} [properties] Properties to set
             */
            function UpInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * UpInfo id.
             * @member {string} id
             * @memberof dice.sc_battle_init.UpInfo
             * @instance
             */
            UpInfo.prototype.id = "";

            /**
             * UpInfo lv.
             * @member {number} lv
             * @memberof dice.sc_battle_init.UpInfo
             * @instance
             */
            UpInfo.prototype.lv = 0;

            /**
             * UpInfo pwlv.
             * @member {number} pwlv
             * @memberof dice.sc_battle_init.UpInfo
             * @instance
             */
            UpInfo.prototype.pwlv = 0;

            /**
             * Creates a new UpInfo instance using the specified properties.
             * @function create
             * @memberof dice.sc_battle_init.UpInfo
             * @static
             * @param {dice.sc_battle_init.IUpInfo=} [properties] Properties to set
             * @returns {dice.sc_battle_init.UpInfo} UpInfo instance
             */
            UpInfo.create = function create(properties) {
                return new UpInfo(properties);
            };

            /**
             * Encodes the specified UpInfo message. Does not implicitly {@link dice.sc_battle_init.UpInfo.verify|verify} messages.
             * @function encode
             * @memberof dice.sc_battle_init.UpInfo
             * @static
             * @param {dice.sc_battle_init.IUpInfo} message UpInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UpInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.lv != null && message.hasOwnProperty("lv"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.lv);
                if (message.pwlv != null && message.hasOwnProperty("pwlv"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.pwlv);
                return writer;
            };

            /**
             * Encodes the specified UpInfo message, length delimited. Does not implicitly {@link dice.sc_battle_init.UpInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dice.sc_battle_init.UpInfo
             * @static
             * @param {dice.sc_battle_init.IUpInfo} message UpInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UpInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an UpInfo message from the specified reader or buffer.
             * @function decode
             * @memberof dice.sc_battle_init.UpInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dice.sc_battle_init.UpInfo} UpInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UpInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_battle_init.UpInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.string();
                        break;
                    case 3:
                        message.lv = reader.int32();
                        break;
                    case 4:
                        message.pwlv = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an UpInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dice.sc_battle_init.UpInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dice.sc_battle_init.UpInfo} UpInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UpInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an UpInfo message.
             * @function verify
             * @memberof dice.sc_battle_init.UpInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            UpInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.lv != null && message.hasOwnProperty("lv"))
                    if (!$util.isInteger(message.lv))
                        return "lv: integer expected";
                if (message.pwlv != null && message.hasOwnProperty("pwlv"))
                    if (!$util.isInteger(message.pwlv))
                        return "pwlv: integer expected";
                return null;
            };

            return UpInfo;
        })();

        return sc_battle_init;
    })();

    dice.cs_battle_sync = (function() {

        /**
         * Properties of a cs_battle_sync.
         * @memberof dice
         * @interface Ics_battle_sync
         * @property {number|null} [frame] cs_battle_sync frame
         * @property {number|null} [rframe] cs_battle_sync rframe
         * @property {string|null} [checkValue] cs_battle_sync checkValue
         * @property {number|null} [checkframe] cs_battle_sync checkframe
         */

        /**
         * Constructs a new cs_battle_sync.
         * @memberof dice
         * @classdesc Represents a cs_battle_sync.
         * @implements Ics_battle_sync
         * @constructor
         * @param {dice.Ics_battle_sync=} [properties] Properties to set
         */
        function cs_battle_sync(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_battle_sync frame.
         * @member {number} frame
         * @memberof dice.cs_battle_sync
         * @instance
         */
        cs_battle_sync.prototype.frame = 0;

        /**
         * cs_battle_sync rframe.
         * @member {number} rframe
         * @memberof dice.cs_battle_sync
         * @instance
         */
        cs_battle_sync.prototype.rframe = 0;

        /**
         * cs_battle_sync checkValue.
         * @member {string} checkValue
         * @memberof dice.cs_battle_sync
         * @instance
         */
        cs_battle_sync.prototype.checkValue = "";

        /**
         * cs_battle_sync checkframe.
         * @member {number} checkframe
         * @memberof dice.cs_battle_sync
         * @instance
         */
        cs_battle_sync.prototype.checkframe = 0;

        /**
         * Creates a new cs_battle_sync instance using the specified properties.
         * @function create
         * @memberof dice.cs_battle_sync
         * @static
         * @param {dice.Ics_battle_sync=} [properties] Properties to set
         * @returns {dice.cs_battle_sync} cs_battle_sync instance
         */
        cs_battle_sync.create = function create(properties) {
            return new cs_battle_sync(properties);
        };

        /**
         * Encodes the specified cs_battle_sync message. Does not implicitly {@link dice.cs_battle_sync.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_battle_sync
         * @static
         * @param {dice.Ics_battle_sync} message cs_battle_sync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_battle_sync.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.frame != null && message.hasOwnProperty("frame"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.frame);
            if (message.rframe != null && message.hasOwnProperty("rframe"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.rframe);
            if (message.checkValue != null && message.hasOwnProperty("checkValue"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.checkValue);
            if (message.checkframe != null && message.hasOwnProperty("checkframe"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.checkframe);
            return writer;
        };

        /**
         * Encodes the specified cs_battle_sync message, length delimited. Does not implicitly {@link dice.cs_battle_sync.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_battle_sync
         * @static
         * @param {dice.Ics_battle_sync} message cs_battle_sync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_battle_sync.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_battle_sync message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_battle_sync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_battle_sync} cs_battle_sync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_battle_sync.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_battle_sync();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.frame = reader.int32();
                    break;
                case 2:
                    message.rframe = reader.int32();
                    break;
                case 3:
                    message.checkValue = reader.string();
                    break;
                case 4:
                    message.checkframe = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_battle_sync message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_battle_sync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_battle_sync} cs_battle_sync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_battle_sync.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_battle_sync message.
         * @function verify
         * @memberof dice.cs_battle_sync
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_battle_sync.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.frame != null && message.hasOwnProperty("frame"))
                if (!$util.isInteger(message.frame))
                    return "frame: integer expected";
            if (message.rframe != null && message.hasOwnProperty("rframe"))
                if (!$util.isInteger(message.rframe))
                    return "rframe: integer expected";
            if (message.checkValue != null && message.hasOwnProperty("checkValue"))
                if (!$util.isString(message.checkValue))
                    return "checkValue: string expected";
            if (message.checkframe != null && message.hasOwnProperty("checkframe"))
                if (!$util.isInteger(message.checkframe))
                    return "checkframe: integer expected";
            return null;
        };

        return cs_battle_sync;
    })();

    dice.sc_battle_sync = (function() {

        /**
         * Properties of a sc_battle_sync.
         * @memberof dice
         * @interface Isc_battle_sync
         * @property {Object.<string,dice.sc_battle_sync.ISyncOptData>|null} [syncOptData] sc_battle_sync syncOptData
         * @property {number|null} [frame] sc_battle_sync frame
         * @property {number|null} [targetFrame] sc_battle_sync targetFrame
         */

        /**
         * Constructs a new sc_battle_sync.
         * @memberof dice
         * @classdesc Represents a sc_battle_sync.
         * @implements Isc_battle_sync
         * @constructor
         * @param {dice.Isc_battle_sync=} [properties] Properties to set
         */
        function sc_battle_sync(properties) {
            this.syncOptData = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * sc_battle_sync syncOptData.
         * @member {Object.<string,dice.sc_battle_sync.ISyncOptData>} syncOptData
         * @memberof dice.sc_battle_sync
         * @instance
         */
        sc_battle_sync.prototype.syncOptData = $util.emptyObject;

        /**
         * sc_battle_sync frame.
         * @member {number} frame
         * @memberof dice.sc_battle_sync
         * @instance
         */
        sc_battle_sync.prototype.frame = 0;

        /**
         * sc_battle_sync targetFrame.
         * @member {number} targetFrame
         * @memberof dice.sc_battle_sync
         * @instance
         */
        sc_battle_sync.prototype.targetFrame = 0;

        /**
         * Creates a new sc_battle_sync instance using the specified properties.
         * @function create
         * @memberof dice.sc_battle_sync
         * @static
         * @param {dice.Isc_battle_sync=} [properties] Properties to set
         * @returns {dice.sc_battle_sync} sc_battle_sync instance
         */
        sc_battle_sync.create = function create(properties) {
            return new sc_battle_sync(properties);
        };

        /**
         * Encodes the specified sc_battle_sync message. Does not implicitly {@link dice.sc_battle_sync.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_battle_sync
         * @static
         * @param {dice.Isc_battle_sync} message sc_battle_sync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_battle_sync.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.syncOptData != null && message.hasOwnProperty("syncOptData"))
                for (var keys = Object.keys(message.syncOptData), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                    $root.dice.sc_battle_sync.SyncOptData.encode(message.syncOptData[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                }
            if (message.frame != null && message.hasOwnProperty("frame"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.frame);
            if (message.targetFrame != null && message.hasOwnProperty("targetFrame"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.targetFrame);
            return writer;
        };

        /**
         * Encodes the specified sc_battle_sync message, length delimited. Does not implicitly {@link dice.sc_battle_sync.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_battle_sync
         * @static
         * @param {dice.Isc_battle_sync} message sc_battle_sync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_battle_sync.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_battle_sync message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_battle_sync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_battle_sync} sc_battle_sync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_battle_sync.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_battle_sync(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    reader.skip().pos++;
                    if (message.syncOptData === $util.emptyObject)
                        message.syncOptData = {};
                    key = reader.string();
                    reader.pos++;
                    message.syncOptData[key] = $root.dice.sc_battle_sync.SyncOptData.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.frame = reader.int32();
                    break;
                case 3:
                    message.targetFrame = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_battle_sync message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_battle_sync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_battle_sync} sc_battle_sync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_battle_sync.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_battle_sync message.
         * @function verify
         * @memberof dice.sc_battle_sync
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_battle_sync.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.syncOptData != null && message.hasOwnProperty("syncOptData")) {
                if (!$util.isObject(message.syncOptData))
                    return "syncOptData: object expected";
                var key = Object.keys(message.syncOptData);
                for (var i = 0; i < key.length; ++i) {
                    var error = $root.dice.sc_battle_sync.SyncOptData.verify(message.syncOptData[key[i]]);
                    if (error)
                        return "syncOptData." + error;
                }
            }
            if (message.frame != null && message.hasOwnProperty("frame"))
                if (!$util.isInteger(message.frame))
                    return "frame: integer expected";
            if (message.targetFrame != null && message.hasOwnProperty("targetFrame"))
                if (!$util.isInteger(message.targetFrame))
                    return "targetFrame: integer expected";
            return null;
        };

        sc_battle_sync.SyncOptData = (function() {

            /**
             * Properties of a SyncOptData.
             * @memberof dice.sc_battle_sync
             * @interface ISyncOptData
             * @property {Array.<dice.sc_battle_sync.IOpt>|null} [opt] SyncOptData opt
             */

            /**
             * Constructs a new SyncOptData.
             * @memberof dice.sc_battle_sync
             * @classdesc Represents a SyncOptData.
             * @implements ISyncOptData
             * @constructor
             * @param {dice.sc_battle_sync.ISyncOptData=} [properties] Properties to set
             */
            function SyncOptData(properties) {
                this.opt = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SyncOptData opt.
             * @member {Array.<dice.sc_battle_sync.IOpt>} opt
             * @memberof dice.sc_battle_sync.SyncOptData
             * @instance
             */
            SyncOptData.prototype.opt = $util.emptyArray;

            /**
             * Creates a new SyncOptData instance using the specified properties.
             * @function create
             * @memberof dice.sc_battle_sync.SyncOptData
             * @static
             * @param {dice.sc_battle_sync.ISyncOptData=} [properties] Properties to set
             * @returns {dice.sc_battle_sync.SyncOptData} SyncOptData instance
             */
            SyncOptData.create = function create(properties) {
                return new SyncOptData(properties);
            };

            /**
             * Encodes the specified SyncOptData message. Does not implicitly {@link dice.sc_battle_sync.SyncOptData.verify|verify} messages.
             * @function encode
             * @memberof dice.sc_battle_sync.SyncOptData
             * @static
             * @param {dice.sc_battle_sync.ISyncOptData} message SyncOptData message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SyncOptData.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opt != null && message.opt.length)
                    for (var i = 0; i < message.opt.length; ++i)
                        $root.dice.sc_battle_sync.Opt.encode(message.opt[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified SyncOptData message, length delimited. Does not implicitly {@link dice.sc_battle_sync.SyncOptData.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dice.sc_battle_sync.SyncOptData
             * @static
             * @param {dice.sc_battle_sync.ISyncOptData} message SyncOptData message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SyncOptData.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SyncOptData message from the specified reader or buffer.
             * @function decode
             * @memberof dice.sc_battle_sync.SyncOptData
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dice.sc_battle_sync.SyncOptData} SyncOptData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SyncOptData.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_battle_sync.SyncOptData();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.opt && message.opt.length))
                            message.opt = [];
                        message.opt.push($root.dice.sc_battle_sync.Opt.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a SyncOptData message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dice.sc_battle_sync.SyncOptData
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dice.sc_battle_sync.SyncOptData} SyncOptData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SyncOptData.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SyncOptData message.
             * @function verify
             * @memberof dice.sc_battle_sync.SyncOptData
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SyncOptData.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.opt != null && message.hasOwnProperty("opt")) {
                    if (!Array.isArray(message.opt))
                        return "opt: array expected";
                    for (var i = 0; i < message.opt.length; ++i) {
                        var error = $root.dice.sc_battle_sync.Opt.verify(message.opt[i]);
                        if (error)
                            return "opt." + error;
                    }
                }
                return null;
            };

            return SyncOptData;
        })();

        sc_battle_sync.Opt = (function() {

            /**
             * Properties of an Opt.
             * @memberof dice.sc_battle_sync
             * @interface IOpt
             * @property {number|null} [optUid] Opt optUid
             * @property {number|null} [opt] Opt opt
             * @property {string|null} [fromPos] Opt fromPos
             * @property {string|null} [toPos] Opt toPos
             * @property {string|null} [upId] Opt upId
             * @property {number|null} [frame] Opt frame
             * @property {number|null} [optseed] Opt optseed
             */

            /**
             * Constructs a new Opt.
             * @memberof dice.sc_battle_sync
             * @classdesc Represents an Opt.
             * @implements IOpt
             * @constructor
             * @param {dice.sc_battle_sync.IOpt=} [properties] Properties to set
             */
            function Opt(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Opt optUid.
             * @member {number} optUid
             * @memberof dice.sc_battle_sync.Opt
             * @instance
             */
            Opt.prototype.optUid = 0;

            /**
             * Opt opt.
             * @member {number} opt
             * @memberof dice.sc_battle_sync.Opt
             * @instance
             */
            Opt.prototype.opt = 0;

            /**
             * Opt fromPos.
             * @member {string} fromPos
             * @memberof dice.sc_battle_sync.Opt
             * @instance
             */
            Opt.prototype.fromPos = "";

            /**
             * Opt toPos.
             * @member {string} toPos
             * @memberof dice.sc_battle_sync.Opt
             * @instance
             */
            Opt.prototype.toPos = "";

            /**
             * Opt upId.
             * @member {string} upId
             * @memberof dice.sc_battle_sync.Opt
             * @instance
             */
            Opt.prototype.upId = "";

            /**
             * Opt frame.
             * @member {number} frame
             * @memberof dice.sc_battle_sync.Opt
             * @instance
             */
            Opt.prototype.frame = 0;

            /**
             * Opt optseed.
             * @member {number} optseed
             * @memberof dice.sc_battle_sync.Opt
             * @instance
             */
            Opt.prototype.optseed = 0;

            /**
             * Creates a new Opt instance using the specified properties.
             * @function create
             * @memberof dice.sc_battle_sync.Opt
             * @static
             * @param {dice.sc_battle_sync.IOpt=} [properties] Properties to set
             * @returns {dice.sc_battle_sync.Opt} Opt instance
             */
            Opt.create = function create(properties) {
                return new Opt(properties);
            };

            /**
             * Encodes the specified Opt message. Does not implicitly {@link dice.sc_battle_sync.Opt.verify|verify} messages.
             * @function encode
             * @memberof dice.sc_battle_sync.Opt
             * @static
             * @param {dice.sc_battle_sync.IOpt} message Opt message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Opt.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.optUid != null && message.hasOwnProperty("optUid"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.optUid);
                if (message.opt != null && message.hasOwnProperty("opt"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.opt);
                if (message.fromPos != null && message.hasOwnProperty("fromPos"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.fromPos);
                if (message.toPos != null && message.hasOwnProperty("toPos"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.toPos);
                if (message.upId != null && message.hasOwnProperty("upId"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.upId);
                if (message.frame != null && message.hasOwnProperty("frame"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.frame);
                if (message.optseed != null && message.hasOwnProperty("optseed"))
                    writer.uint32(/* id 7, wireType 0 =*/56).int32(message.optseed);
                return writer;
            };

            /**
             * Encodes the specified Opt message, length delimited. Does not implicitly {@link dice.sc_battle_sync.Opt.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dice.sc_battle_sync.Opt
             * @static
             * @param {dice.sc_battle_sync.IOpt} message Opt message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Opt.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Opt message from the specified reader or buffer.
             * @function decode
             * @memberof dice.sc_battle_sync.Opt
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dice.sc_battle_sync.Opt} Opt
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Opt.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_battle_sync.Opt();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.optUid = reader.int32();
                        break;
                    case 2:
                        message.opt = reader.int32();
                        break;
                    case 3:
                        message.fromPos = reader.string();
                        break;
                    case 4:
                        message.toPos = reader.string();
                        break;
                    case 5:
                        message.upId = reader.string();
                        break;
                    case 6:
                        message.frame = reader.int32();
                        break;
                    case 7:
                        message.optseed = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Opt message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dice.sc_battle_sync.Opt
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dice.sc_battle_sync.Opt} Opt
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Opt.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Opt message.
             * @function verify
             * @memberof dice.sc_battle_sync.Opt
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Opt.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.optUid != null && message.hasOwnProperty("optUid"))
                    if (!$util.isInteger(message.optUid))
                        return "optUid: integer expected";
                if (message.opt != null && message.hasOwnProperty("opt"))
                    if (!$util.isInteger(message.opt))
                        return "opt: integer expected";
                if (message.fromPos != null && message.hasOwnProperty("fromPos"))
                    if (!$util.isString(message.fromPos))
                        return "fromPos: string expected";
                if (message.toPos != null && message.hasOwnProperty("toPos"))
                    if (!$util.isString(message.toPos))
                        return "toPos: string expected";
                if (message.upId != null && message.hasOwnProperty("upId"))
                    if (!$util.isString(message.upId))
                        return "upId: string expected";
                if (message.frame != null && message.hasOwnProperty("frame"))
                    if (!$util.isInteger(message.frame))
                        return "frame: integer expected";
                if (message.optseed != null && message.hasOwnProperty("optseed"))
                    if (!$util.isInteger(message.optseed))
                        return "optseed: integer expected";
                return null;
            };

            return Opt;
        })();

        return sc_battle_sync;
    })();

    dice.cs_battle_opt = (function() {

        /**
         * Properties of a cs_battle_opt.
         * @memberof dice
         * @interface Ics_battle_opt
         * @property {number|null} [opt] cs_battle_opt opt
         * @property {string|null} [fromPos] cs_battle_opt fromPos
         * @property {string|null} [toPos] cs_battle_opt toPos
         * @property {string|null} [upId] cs_battle_opt upId
         * @property {number|null} [optseed] cs_battle_opt optseed
         */

        /**
         * Constructs a new cs_battle_opt.
         * @memberof dice
         * @classdesc Represents a cs_battle_opt.
         * @implements Ics_battle_opt
         * @constructor
         * @param {dice.Ics_battle_opt=} [properties] Properties to set
         */
        function cs_battle_opt(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_battle_opt opt.
         * @member {number} opt
         * @memberof dice.cs_battle_opt
         * @instance
         */
        cs_battle_opt.prototype.opt = 0;

        /**
         * cs_battle_opt fromPos.
         * @member {string} fromPos
         * @memberof dice.cs_battle_opt
         * @instance
         */
        cs_battle_opt.prototype.fromPos = "";

        /**
         * cs_battle_opt toPos.
         * @member {string} toPos
         * @memberof dice.cs_battle_opt
         * @instance
         */
        cs_battle_opt.prototype.toPos = "";

        /**
         * cs_battle_opt upId.
         * @member {string} upId
         * @memberof dice.cs_battle_opt
         * @instance
         */
        cs_battle_opt.prototype.upId = "";

        /**
         * cs_battle_opt optseed.
         * @member {number} optseed
         * @memberof dice.cs_battle_opt
         * @instance
         */
        cs_battle_opt.prototype.optseed = 0;

        /**
         * Creates a new cs_battle_opt instance using the specified properties.
         * @function create
         * @memberof dice.cs_battle_opt
         * @static
         * @param {dice.Ics_battle_opt=} [properties] Properties to set
         * @returns {dice.cs_battle_opt} cs_battle_opt instance
         */
        cs_battle_opt.create = function create(properties) {
            return new cs_battle_opt(properties);
        };

        /**
         * Encodes the specified cs_battle_opt message. Does not implicitly {@link dice.cs_battle_opt.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_battle_opt
         * @static
         * @param {dice.Ics_battle_opt} message cs_battle_opt message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_battle_opt.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opt != null && message.hasOwnProperty("opt"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.opt);
            if (message.fromPos != null && message.hasOwnProperty("fromPos"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.fromPos);
            if (message.toPos != null && message.hasOwnProperty("toPos"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.toPos);
            if (message.upId != null && message.hasOwnProperty("upId"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.upId);
            if (message.optseed != null && message.hasOwnProperty("optseed"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.optseed);
            return writer;
        };

        /**
         * Encodes the specified cs_battle_opt message, length delimited. Does not implicitly {@link dice.cs_battle_opt.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_battle_opt
         * @static
         * @param {dice.Ics_battle_opt} message cs_battle_opt message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_battle_opt.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_battle_opt message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_battle_opt
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_battle_opt} cs_battle_opt
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_battle_opt.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_battle_opt();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 2:
                    message.opt = reader.int32();
                    break;
                case 3:
                    message.fromPos = reader.string();
                    break;
                case 4:
                    message.toPos = reader.string();
                    break;
                case 5:
                    message.upId = reader.string();
                    break;
                case 6:
                    message.optseed = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_battle_opt message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_battle_opt
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_battle_opt} cs_battle_opt
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_battle_opt.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_battle_opt message.
         * @function verify
         * @memberof dice.cs_battle_opt
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_battle_opt.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opt != null && message.hasOwnProperty("opt"))
                if (!$util.isInteger(message.opt))
                    return "opt: integer expected";
            if (message.fromPos != null && message.hasOwnProperty("fromPos"))
                if (!$util.isString(message.fromPos))
                    return "fromPos: string expected";
            if (message.toPos != null && message.hasOwnProperty("toPos"))
                if (!$util.isString(message.toPos))
                    return "toPos: string expected";
            if (message.upId != null && message.hasOwnProperty("upId"))
                if (!$util.isString(message.upId))
                    return "upId: string expected";
            if (message.optseed != null && message.hasOwnProperty("optseed"))
                if (!$util.isInteger(message.optseed))
                    return "optseed: integer expected";
            return null;
        };

        return cs_battle_opt;
    })();

    dice.sc_battle_opt = (function() {

        /**
         * Properties of a sc_battle_opt.
         * @memberof dice
         * @interface Isc_battle_opt
         */

        /**
         * Constructs a new sc_battle_opt.
         * @memberof dice
         * @classdesc Represents a sc_battle_opt.
         * @implements Isc_battle_opt
         * @constructor
         * @param {dice.Isc_battle_opt=} [properties] Properties to set
         */
        function sc_battle_opt(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new sc_battle_opt instance using the specified properties.
         * @function create
         * @memberof dice.sc_battle_opt
         * @static
         * @param {dice.Isc_battle_opt=} [properties] Properties to set
         * @returns {dice.sc_battle_opt} sc_battle_opt instance
         */
        sc_battle_opt.create = function create(properties) {
            return new sc_battle_opt(properties);
        };

        /**
         * Encodes the specified sc_battle_opt message. Does not implicitly {@link dice.sc_battle_opt.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_battle_opt
         * @static
         * @param {dice.Isc_battle_opt} message sc_battle_opt message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_battle_opt.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified sc_battle_opt message, length delimited. Does not implicitly {@link dice.sc_battle_opt.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_battle_opt
         * @static
         * @param {dice.Isc_battle_opt} message sc_battle_opt message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_battle_opt.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_battle_opt message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_battle_opt
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_battle_opt} sc_battle_opt
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_battle_opt.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_battle_opt();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_battle_opt message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_battle_opt
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_battle_opt} sc_battle_opt
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_battle_opt.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_battle_opt message.
         * @function verify
         * @memberof dice.sc_battle_opt
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_battle_opt.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return sc_battle_opt;
    })();

    dice.cs_battle_end = (function() {

        /**
         * Properties of a cs_battle_end.
         * @memberof dice
         * @interface Ics_battle_end
         * @property {number|null} [turns] cs_battle_end turns
         * @property {number|null} [winFlag] cs_battle_end winFlag
         * @property {number|null} [star] cs_battle_end star
         * @property {Object.<string,number>|null} [starArr] cs_battle_end starArr
         */

        /**
         * Constructs a new cs_battle_end.
         * @memberof dice
         * @classdesc Represents a cs_battle_end.
         * @implements Ics_battle_end
         * @constructor
         * @param {dice.Ics_battle_end=} [properties] Properties to set
         */
        function cs_battle_end(properties) {
            this.starArr = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_battle_end turns.
         * @member {number} turns
         * @memberof dice.cs_battle_end
         * @instance
         */
        cs_battle_end.prototype.turns = 0;

        /**
         * cs_battle_end winFlag.
         * @member {number} winFlag
         * @memberof dice.cs_battle_end
         * @instance
         */
        cs_battle_end.prototype.winFlag = 0;

        /**
         * cs_battle_end star.
         * @member {number} star
         * @memberof dice.cs_battle_end
         * @instance
         */
        cs_battle_end.prototype.star = 0;

        /**
         * cs_battle_end starArr.
         * @member {Object.<string,number>} starArr
         * @memberof dice.cs_battle_end
         * @instance
         */
        cs_battle_end.prototype.starArr = $util.emptyObject;

        /**
         * Creates a new cs_battle_end instance using the specified properties.
         * @function create
         * @memberof dice.cs_battle_end
         * @static
         * @param {dice.Ics_battle_end=} [properties] Properties to set
         * @returns {dice.cs_battle_end} cs_battle_end instance
         */
        cs_battle_end.create = function create(properties) {
            return new cs_battle_end(properties);
        };

        /**
         * Encodes the specified cs_battle_end message. Does not implicitly {@link dice.cs_battle_end.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_battle_end
         * @static
         * @param {dice.Ics_battle_end} message cs_battle_end message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_battle_end.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.turns != null && message.hasOwnProperty("turns"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.turns);
            if (message.winFlag != null && message.hasOwnProperty("winFlag"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.winFlag);
            if (message.star != null && message.hasOwnProperty("star"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.star);
            if (message.starArr != null && message.hasOwnProperty("starArr"))
                for (var keys = Object.keys(message.starArr), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 4, wireType 2 =*/34).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 0 =*/16).int32(message.starArr[keys[i]]).ldelim();
            return writer;
        };

        /**
         * Encodes the specified cs_battle_end message, length delimited. Does not implicitly {@link dice.cs_battle_end.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_battle_end
         * @static
         * @param {dice.Ics_battle_end} message cs_battle_end message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_battle_end.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_battle_end message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_battle_end
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_battle_end} cs_battle_end
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_battle_end.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_battle_end(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.turns = reader.int32();
                    break;
                case 2:
                    message.winFlag = reader.int32();
                    break;
                case 3:
                    message.star = reader.int32();
                    break;
                case 4:
                    reader.skip().pos++;
                    if (message.starArr === $util.emptyObject)
                        message.starArr = {};
                    key = reader.string();
                    reader.pos++;
                    message.starArr[key] = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_battle_end message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_battle_end
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_battle_end} cs_battle_end
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_battle_end.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_battle_end message.
         * @function verify
         * @memberof dice.cs_battle_end
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_battle_end.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.turns != null && message.hasOwnProperty("turns"))
                if (!$util.isInteger(message.turns))
                    return "turns: integer expected";
            if (message.winFlag != null && message.hasOwnProperty("winFlag"))
                if (!$util.isInteger(message.winFlag))
                    return "winFlag: integer expected";
            if (message.star != null && message.hasOwnProperty("star"))
                if (!$util.isInteger(message.star))
                    return "star: integer expected";
            if (message.starArr != null && message.hasOwnProperty("starArr")) {
                if (!$util.isObject(message.starArr))
                    return "starArr: object expected";
                var key = Object.keys(message.starArr);
                for (var i = 0; i < key.length; ++i)
                    if (!$util.isInteger(message.starArr[key[i]]))
                        return "starArr: integer{k:string} expected";
            }
            return null;
        };

        return cs_battle_end;
    })();

    dice.sc_battle_end = (function() {

        /**
         * Properties of a sc_battle_end.
         * @memberof dice
         * @interface Isc_battle_end
         * @property {Object.<string,dice.sc_battle_end.IRewardInfo>|null} [rewardArr] sc_battle_end rewardArr
         */

        /**
         * Constructs a new sc_battle_end.
         * @memberof dice
         * @classdesc Represents a sc_battle_end.
         * @implements Isc_battle_end
         * @constructor
         * @param {dice.Isc_battle_end=} [properties] Properties to set
         */
        function sc_battle_end(properties) {
            this.rewardArr = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * sc_battle_end rewardArr.
         * @member {Object.<string,dice.sc_battle_end.IRewardInfo>} rewardArr
         * @memberof dice.sc_battle_end
         * @instance
         */
        sc_battle_end.prototype.rewardArr = $util.emptyObject;

        /**
         * Creates a new sc_battle_end instance using the specified properties.
         * @function create
         * @memberof dice.sc_battle_end
         * @static
         * @param {dice.Isc_battle_end=} [properties] Properties to set
         * @returns {dice.sc_battle_end} sc_battle_end instance
         */
        sc_battle_end.create = function create(properties) {
            return new sc_battle_end(properties);
        };

        /**
         * Encodes the specified sc_battle_end message. Does not implicitly {@link dice.sc_battle_end.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_battle_end
         * @static
         * @param {dice.Isc_battle_end} message sc_battle_end message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_battle_end.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.rewardArr != null && message.hasOwnProperty("rewardArr"))
                for (var keys = Object.keys(message.rewardArr), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                    $root.dice.sc_battle_end.RewardInfo.encode(message.rewardArr[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                }
            return writer;
        };

        /**
         * Encodes the specified sc_battle_end message, length delimited. Does not implicitly {@link dice.sc_battle_end.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_battle_end
         * @static
         * @param {dice.Isc_battle_end} message sc_battle_end message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_battle_end.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_battle_end message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_battle_end
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_battle_end} sc_battle_end
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_battle_end.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_battle_end(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    reader.skip().pos++;
                    if (message.rewardArr === $util.emptyObject)
                        message.rewardArr = {};
                    key = reader.string();
                    reader.pos++;
                    message.rewardArr[key] = $root.dice.sc_battle_end.RewardInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_battle_end message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_battle_end
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_battle_end} sc_battle_end
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_battle_end.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_battle_end message.
         * @function verify
         * @memberof dice.sc_battle_end
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_battle_end.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.rewardArr != null && message.hasOwnProperty("rewardArr")) {
                if (!$util.isObject(message.rewardArr))
                    return "rewardArr: object expected";
                var key = Object.keys(message.rewardArr);
                for (var i = 0; i < key.length; ++i) {
                    var error = $root.dice.sc_battle_end.RewardInfo.verify(message.rewardArr[key[i]]);
                    if (error)
                        return "rewardArr." + error;
                }
            }
            return null;
        };

        sc_battle_end.RewardInfo = (function() {

            /**
             * Properties of a RewardInfo.
             * @memberof dice.sc_battle_end
             * @interface IRewardInfo
             * @property {number|null} [score] RewardInfo score
             * @property {number|null} [gold] RewardInfo gold
             * @property {number|null} [gem] RewardInfo gem
             * @property {number|null} [winNum] RewardInfo winNum
             */

            /**
             * Constructs a new RewardInfo.
             * @memberof dice.sc_battle_end
             * @classdesc Represents a RewardInfo.
             * @implements IRewardInfo
             * @constructor
             * @param {dice.sc_battle_end.IRewardInfo=} [properties] Properties to set
             */
            function RewardInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RewardInfo score.
             * @member {number} score
             * @memberof dice.sc_battle_end.RewardInfo
             * @instance
             */
            RewardInfo.prototype.score = 0;

            /**
             * RewardInfo gold.
             * @member {number} gold
             * @memberof dice.sc_battle_end.RewardInfo
             * @instance
             */
            RewardInfo.prototype.gold = 0;

            /**
             * RewardInfo gem.
             * @member {number} gem
             * @memberof dice.sc_battle_end.RewardInfo
             * @instance
             */
            RewardInfo.prototype.gem = 0;

            /**
             * RewardInfo winNum.
             * @member {number} winNum
             * @memberof dice.sc_battle_end.RewardInfo
             * @instance
             */
            RewardInfo.prototype.winNum = 0;

            /**
             * Creates a new RewardInfo instance using the specified properties.
             * @function create
             * @memberof dice.sc_battle_end.RewardInfo
             * @static
             * @param {dice.sc_battle_end.IRewardInfo=} [properties] Properties to set
             * @returns {dice.sc_battle_end.RewardInfo} RewardInfo instance
             */
            RewardInfo.create = function create(properties) {
                return new RewardInfo(properties);
            };

            /**
             * Encodes the specified RewardInfo message. Does not implicitly {@link dice.sc_battle_end.RewardInfo.verify|verify} messages.
             * @function encode
             * @memberof dice.sc_battle_end.RewardInfo
             * @static
             * @param {dice.sc_battle_end.IRewardInfo} message RewardInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RewardInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.score != null && message.hasOwnProperty("score"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.score);
                if (message.gold != null && message.hasOwnProperty("gold"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.gold);
                if (message.gem != null && message.hasOwnProperty("gem"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.gem);
                if (message.winNum != null && message.hasOwnProperty("winNum"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.winNum);
                return writer;
            };

            /**
             * Encodes the specified RewardInfo message, length delimited. Does not implicitly {@link dice.sc_battle_end.RewardInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dice.sc_battle_end.RewardInfo
             * @static
             * @param {dice.sc_battle_end.IRewardInfo} message RewardInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RewardInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RewardInfo message from the specified reader or buffer.
             * @function decode
             * @memberof dice.sc_battle_end.RewardInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dice.sc_battle_end.RewardInfo} RewardInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RewardInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_battle_end.RewardInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.score = reader.int32();
                        break;
                    case 2:
                        message.gold = reader.int32();
                        break;
                    case 3:
                        message.gem = reader.int32();
                        break;
                    case 4:
                        message.winNum = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a RewardInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dice.sc_battle_end.RewardInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dice.sc_battle_end.RewardInfo} RewardInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RewardInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RewardInfo message.
             * @function verify
             * @memberof dice.sc_battle_end.RewardInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RewardInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.score != null && message.hasOwnProperty("score"))
                    if (!$util.isInteger(message.score))
                        return "score: integer expected";
                if (message.gold != null && message.hasOwnProperty("gold"))
                    if (!$util.isInteger(message.gold))
                        return "gold: integer expected";
                if (message.gem != null && message.hasOwnProperty("gem"))
                    if (!$util.isInteger(message.gem))
                        return "gem: integer expected";
                if (message.winNum != null && message.hasOwnProperty("winNum"))
                    if (!$util.isInteger(message.winNum))
                        return "winNum: integer expected";
                return null;
            };

            return RewardInfo;
        })();

        return sc_battle_end;
    })();

    dice.cs_battle_getLog = (function() {

        /**
         * Properties of a cs_battle_getLog.
         * @memberof dice
         * @interface Ics_battle_getLog
         */

        /**
         * Constructs a new cs_battle_getLog.
         * @memberof dice
         * @classdesc Represents a cs_battle_getLog.
         * @implements Ics_battle_getLog
         * @constructor
         * @param {dice.Ics_battle_getLog=} [properties] Properties to set
         */
        function cs_battle_getLog(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new cs_battle_getLog instance using the specified properties.
         * @function create
         * @memberof dice.cs_battle_getLog
         * @static
         * @param {dice.Ics_battle_getLog=} [properties] Properties to set
         * @returns {dice.cs_battle_getLog} cs_battle_getLog instance
         */
        cs_battle_getLog.create = function create(properties) {
            return new cs_battle_getLog(properties);
        };

        /**
         * Encodes the specified cs_battle_getLog message. Does not implicitly {@link dice.cs_battle_getLog.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_battle_getLog
         * @static
         * @param {dice.Ics_battle_getLog} message cs_battle_getLog message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_battle_getLog.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified cs_battle_getLog message, length delimited. Does not implicitly {@link dice.cs_battle_getLog.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_battle_getLog
         * @static
         * @param {dice.Ics_battle_getLog} message cs_battle_getLog message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_battle_getLog.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_battle_getLog message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_battle_getLog
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_battle_getLog} cs_battle_getLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_battle_getLog.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_battle_getLog();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_battle_getLog message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_battle_getLog
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_battle_getLog} cs_battle_getLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_battle_getLog.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_battle_getLog message.
         * @function verify
         * @memberof dice.cs_battle_getLog
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_battle_getLog.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return cs_battle_getLog;
    })();

    dice.sc_battle_getLog = (function() {

        /**
         * Properties of a sc_battle_getLog.
         * @memberof dice
         * @interface Isc_battle_getLog
         */

        /**
         * Constructs a new sc_battle_getLog.
         * @memberof dice
         * @classdesc Represents a sc_battle_getLog.
         * @implements Isc_battle_getLog
         * @constructor
         * @param {dice.Isc_battle_getLog=} [properties] Properties to set
         */
        function sc_battle_getLog(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new sc_battle_getLog instance using the specified properties.
         * @function create
         * @memberof dice.sc_battle_getLog
         * @static
         * @param {dice.Isc_battle_getLog=} [properties] Properties to set
         * @returns {dice.sc_battle_getLog} sc_battle_getLog instance
         */
        sc_battle_getLog.create = function create(properties) {
            return new sc_battle_getLog(properties);
        };

        /**
         * Encodes the specified sc_battle_getLog message. Does not implicitly {@link dice.sc_battle_getLog.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_battle_getLog
         * @static
         * @param {dice.Isc_battle_getLog} message sc_battle_getLog message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_battle_getLog.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified sc_battle_getLog message, length delimited. Does not implicitly {@link dice.sc_battle_getLog.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_battle_getLog
         * @static
         * @param {dice.Isc_battle_getLog} message sc_battle_getLog message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_battle_getLog.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_battle_getLog message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_battle_getLog
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_battle_getLog} sc_battle_getLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_battle_getLog.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_battle_getLog();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_battle_getLog message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_battle_getLog
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_battle_getLog} sc_battle_getLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_battle_getLog.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_battle_getLog message.
         * @function verify
         * @memberof dice.sc_battle_getLog
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_battle_getLog.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return sc_battle_getLog;
    })();

    dice.cs_battle_complain = (function() {

        /**
         * Properties of a cs_battle_complain.
         * @memberof dice
         * @interface Ics_battle_complain
         * @property {number|null} [logKey] cs_battle_complain logKey
         */

        /**
         * Constructs a new cs_battle_complain.
         * @memberof dice
         * @classdesc Represents a cs_battle_complain.
         * @implements Ics_battle_complain
         * @constructor
         * @param {dice.Ics_battle_complain=} [properties] Properties to set
         */
        function cs_battle_complain(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_battle_complain logKey.
         * @member {number} logKey
         * @memberof dice.cs_battle_complain
         * @instance
         */
        cs_battle_complain.prototype.logKey = 0;

        /**
         * Creates a new cs_battle_complain instance using the specified properties.
         * @function create
         * @memberof dice.cs_battle_complain
         * @static
         * @param {dice.Ics_battle_complain=} [properties] Properties to set
         * @returns {dice.cs_battle_complain} cs_battle_complain instance
         */
        cs_battle_complain.create = function create(properties) {
            return new cs_battle_complain(properties);
        };

        /**
         * Encodes the specified cs_battle_complain message. Does not implicitly {@link dice.cs_battle_complain.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_battle_complain
         * @static
         * @param {dice.Ics_battle_complain} message cs_battle_complain message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_battle_complain.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.logKey != null && message.hasOwnProperty("logKey"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.logKey);
            return writer;
        };

        /**
         * Encodes the specified cs_battle_complain message, length delimited. Does not implicitly {@link dice.cs_battle_complain.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_battle_complain
         * @static
         * @param {dice.Ics_battle_complain} message cs_battle_complain message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_battle_complain.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_battle_complain message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_battle_complain
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_battle_complain} cs_battle_complain
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_battle_complain.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_battle_complain();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.logKey = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_battle_complain message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_battle_complain
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_battle_complain} cs_battle_complain
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_battle_complain.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_battle_complain message.
         * @function verify
         * @memberof dice.cs_battle_complain
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_battle_complain.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.logKey != null && message.hasOwnProperty("logKey"))
                if (!$util.isInteger(message.logKey))
                    return "logKey: integer expected";
            return null;
        };

        return cs_battle_complain;
    })();

    dice.sc_battle_complain = (function() {

        /**
         * Properties of a sc_battle_complain.
         * @memberof dice
         * @interface Isc_battle_complain
         */

        /**
         * Constructs a new sc_battle_complain.
         * @memberof dice
         * @classdesc Represents a sc_battle_complain.
         * @implements Isc_battle_complain
         * @constructor
         * @param {dice.Isc_battle_complain=} [properties] Properties to set
         */
        function sc_battle_complain(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new sc_battle_complain instance using the specified properties.
         * @function create
         * @memberof dice.sc_battle_complain
         * @static
         * @param {dice.Isc_battle_complain=} [properties] Properties to set
         * @returns {dice.sc_battle_complain} sc_battle_complain instance
         */
        sc_battle_complain.create = function create(properties) {
            return new sc_battle_complain(properties);
        };

        /**
         * Encodes the specified sc_battle_complain message. Does not implicitly {@link dice.sc_battle_complain.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_battle_complain
         * @static
         * @param {dice.Isc_battle_complain} message sc_battle_complain message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_battle_complain.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified sc_battle_complain message, length delimited. Does not implicitly {@link dice.sc_battle_complain.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_battle_complain
         * @static
         * @param {dice.Isc_battle_complain} message sc_battle_complain message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_battle_complain.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_battle_complain message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_battle_complain
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_battle_complain} sc_battle_complain
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_battle_complain.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_battle_complain();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_battle_complain message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_battle_complain
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_battle_complain} sc_battle_complain
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_battle_complain.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_battle_complain message.
         * @function verify
         * @memberof dice.sc_battle_complain
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_battle_complain.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return sc_battle_complain;
    })();

    dice.cs_advertise_watch = (function() {

        /**
         * Properties of a cs_advertise_watch.
         * @memberof dice
         * @interface Ics_advertise_watch
         * @property {number|null} [advType] cs_advertise_watch advType
         */

        /**
         * Constructs a new cs_advertise_watch.
         * @memberof dice
         * @classdesc Represents a cs_advertise_watch.
         * @implements Ics_advertise_watch
         * @constructor
         * @param {dice.Ics_advertise_watch=} [properties] Properties to set
         */
        function cs_advertise_watch(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_advertise_watch advType.
         * @member {number} advType
         * @memberof dice.cs_advertise_watch
         * @instance
         */
        cs_advertise_watch.prototype.advType = 0;

        /**
         * Creates a new cs_advertise_watch instance using the specified properties.
         * @function create
         * @memberof dice.cs_advertise_watch
         * @static
         * @param {dice.Ics_advertise_watch=} [properties] Properties to set
         * @returns {dice.cs_advertise_watch} cs_advertise_watch instance
         */
        cs_advertise_watch.create = function create(properties) {
            return new cs_advertise_watch(properties);
        };

        /**
         * Encodes the specified cs_advertise_watch message. Does not implicitly {@link dice.cs_advertise_watch.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_advertise_watch
         * @static
         * @param {dice.Ics_advertise_watch} message cs_advertise_watch message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_advertise_watch.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.advType != null && message.hasOwnProperty("advType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.advType);
            return writer;
        };

        /**
         * Encodes the specified cs_advertise_watch message, length delimited. Does not implicitly {@link dice.cs_advertise_watch.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_advertise_watch
         * @static
         * @param {dice.Ics_advertise_watch} message cs_advertise_watch message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_advertise_watch.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_advertise_watch message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_advertise_watch
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_advertise_watch} cs_advertise_watch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_advertise_watch.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_advertise_watch();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.advType = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_advertise_watch message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_advertise_watch
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_advertise_watch} cs_advertise_watch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_advertise_watch.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_advertise_watch message.
         * @function verify
         * @memberof dice.cs_advertise_watch
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_advertise_watch.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.advType != null && message.hasOwnProperty("advType"))
                if (!$util.isInteger(message.advType))
                    return "advType: integer expected";
            return null;
        };

        return cs_advertise_watch;
    })();

    dice.sc_advertise_watch = (function() {

        /**
         * Properties of a sc_advertise_watch.
         * @memberof dice
         * @interface Isc_advertise_watch
         * @property {string|null} [rewards] sc_advertise_watch rewards
         */

        /**
         * Constructs a new sc_advertise_watch.
         * @memberof dice
         * @classdesc Represents a sc_advertise_watch.
         * @implements Isc_advertise_watch
         * @constructor
         * @param {dice.Isc_advertise_watch=} [properties] Properties to set
         */
        function sc_advertise_watch(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * sc_advertise_watch rewards.
         * @member {string} rewards
         * @memberof dice.sc_advertise_watch
         * @instance
         */
        sc_advertise_watch.prototype.rewards = "";

        /**
         * Creates a new sc_advertise_watch instance using the specified properties.
         * @function create
         * @memberof dice.sc_advertise_watch
         * @static
         * @param {dice.Isc_advertise_watch=} [properties] Properties to set
         * @returns {dice.sc_advertise_watch} sc_advertise_watch instance
         */
        sc_advertise_watch.create = function create(properties) {
            return new sc_advertise_watch(properties);
        };

        /**
         * Encodes the specified sc_advertise_watch message. Does not implicitly {@link dice.sc_advertise_watch.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_advertise_watch
         * @static
         * @param {dice.Isc_advertise_watch} message sc_advertise_watch message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_advertise_watch.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.rewards);
            return writer;
        };

        /**
         * Encodes the specified sc_advertise_watch message, length delimited. Does not implicitly {@link dice.sc_advertise_watch.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_advertise_watch
         * @static
         * @param {dice.Isc_advertise_watch} message sc_advertise_watch message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_advertise_watch.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_advertise_watch message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_advertise_watch
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_advertise_watch} sc_advertise_watch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_advertise_watch.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_advertise_watch();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.rewards = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_advertise_watch message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_advertise_watch
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_advertise_watch} sc_advertise_watch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_advertise_watch.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_advertise_watch message.
         * @function verify
         * @memberof dice.sc_advertise_watch
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_advertise_watch.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                if (!$util.isString(message.rewards))
                    return "rewards: string expected";
            return null;
        };

        return sc_advertise_watch;
    })();

    dice.cs_fairArena_start = (function() {

        /**
         * Properties of a cs_fairArena_start.
         * @memberof dice
         * @interface Ics_fairArena_start
         */

        /**
         * Constructs a new cs_fairArena_start.
         * @memberof dice
         * @classdesc Represents a cs_fairArena_start.
         * @implements Ics_fairArena_start
         * @constructor
         * @param {dice.Ics_fairArena_start=} [properties] Properties to set
         */
        function cs_fairArena_start(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new cs_fairArena_start instance using the specified properties.
         * @function create
         * @memberof dice.cs_fairArena_start
         * @static
         * @param {dice.Ics_fairArena_start=} [properties] Properties to set
         * @returns {dice.cs_fairArena_start} cs_fairArena_start instance
         */
        cs_fairArena_start.create = function create(properties) {
            return new cs_fairArena_start(properties);
        };

        /**
         * Encodes the specified cs_fairArena_start message. Does not implicitly {@link dice.cs_fairArena_start.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_fairArena_start
         * @static
         * @param {dice.Ics_fairArena_start} message cs_fairArena_start message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_fairArena_start.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified cs_fairArena_start message, length delimited. Does not implicitly {@link dice.cs_fairArena_start.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_fairArena_start
         * @static
         * @param {dice.Ics_fairArena_start} message cs_fairArena_start message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_fairArena_start.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_fairArena_start message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_fairArena_start
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_fairArena_start} cs_fairArena_start
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_fairArena_start.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_fairArena_start();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_fairArena_start message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_fairArena_start
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_fairArena_start} cs_fairArena_start
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_fairArena_start.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_fairArena_start message.
         * @function verify
         * @memberof dice.cs_fairArena_start
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_fairArena_start.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return cs_fairArena_start;
    })();

    dice.sc_fairArena_start = (function() {

        /**
         * Properties of a sc_fairArena_start.
         * @memberof dice
         * @interface Isc_fairArena_start
         */

        /**
         * Constructs a new sc_fairArena_start.
         * @memberof dice
         * @classdesc Represents a sc_fairArena_start.
         * @implements Isc_fairArena_start
         * @constructor
         * @param {dice.Isc_fairArena_start=} [properties] Properties to set
         */
        function sc_fairArena_start(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new sc_fairArena_start instance using the specified properties.
         * @function create
         * @memberof dice.sc_fairArena_start
         * @static
         * @param {dice.Isc_fairArena_start=} [properties] Properties to set
         * @returns {dice.sc_fairArena_start} sc_fairArena_start instance
         */
        sc_fairArena_start.create = function create(properties) {
            return new sc_fairArena_start(properties);
        };

        /**
         * Encodes the specified sc_fairArena_start message. Does not implicitly {@link dice.sc_fairArena_start.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_fairArena_start
         * @static
         * @param {dice.Isc_fairArena_start} message sc_fairArena_start message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_fairArena_start.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified sc_fairArena_start message, length delimited. Does not implicitly {@link dice.sc_fairArena_start.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_fairArena_start
         * @static
         * @param {dice.Isc_fairArena_start} message sc_fairArena_start message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_fairArena_start.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_fairArena_start message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_fairArena_start
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_fairArena_start} sc_fairArena_start
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_fairArena_start.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_fairArena_start();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_fairArena_start message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_fairArena_start
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_fairArena_start} sc_fairArena_start
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_fairArena_start.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_fairArena_start message.
         * @function verify
         * @memberof dice.sc_fairArena_start
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_fairArena_start.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return sc_fairArena_start;
    })();

    dice.cs_fairArena_choose = (function() {

        /**
         * Properties of a cs_fairArena_choose.
         * @memberof dice
         * @interface Ics_fairArena_choose
         * @property {string|null} [diceId] cs_fairArena_choose diceId
         */

        /**
         * Constructs a new cs_fairArena_choose.
         * @memberof dice
         * @classdesc Represents a cs_fairArena_choose.
         * @implements Ics_fairArena_choose
         * @constructor
         * @param {dice.Ics_fairArena_choose=} [properties] Properties to set
         */
        function cs_fairArena_choose(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_fairArena_choose diceId.
         * @member {string} diceId
         * @memberof dice.cs_fairArena_choose
         * @instance
         */
        cs_fairArena_choose.prototype.diceId = "";

        /**
         * Creates a new cs_fairArena_choose instance using the specified properties.
         * @function create
         * @memberof dice.cs_fairArena_choose
         * @static
         * @param {dice.Ics_fairArena_choose=} [properties] Properties to set
         * @returns {dice.cs_fairArena_choose} cs_fairArena_choose instance
         */
        cs_fairArena_choose.create = function create(properties) {
            return new cs_fairArena_choose(properties);
        };

        /**
         * Encodes the specified cs_fairArena_choose message. Does not implicitly {@link dice.cs_fairArena_choose.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_fairArena_choose
         * @static
         * @param {dice.Ics_fairArena_choose} message cs_fairArena_choose message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_fairArena_choose.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.diceId != null && message.hasOwnProperty("diceId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.diceId);
            return writer;
        };

        /**
         * Encodes the specified cs_fairArena_choose message, length delimited. Does not implicitly {@link dice.cs_fairArena_choose.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_fairArena_choose
         * @static
         * @param {dice.Ics_fairArena_choose} message cs_fairArena_choose message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_fairArena_choose.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_fairArena_choose message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_fairArena_choose
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_fairArena_choose} cs_fairArena_choose
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_fairArena_choose.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_fairArena_choose();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.diceId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_fairArena_choose message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_fairArena_choose
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_fairArena_choose} cs_fairArena_choose
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_fairArena_choose.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_fairArena_choose message.
         * @function verify
         * @memberof dice.cs_fairArena_choose
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_fairArena_choose.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.diceId != null && message.hasOwnProperty("diceId"))
                if (!$util.isString(message.diceId))
                    return "diceId: string expected";
            return null;
        };

        return cs_fairArena_choose;
    })();

    dice.sc_fairArena_choose = (function() {

        /**
         * Properties of a sc_fairArena_choose.
         * @memberof dice
         * @interface Isc_fairArena_choose
         */

        /**
         * Constructs a new sc_fairArena_choose.
         * @memberof dice
         * @classdesc Represents a sc_fairArena_choose.
         * @implements Isc_fairArena_choose
         * @constructor
         * @param {dice.Isc_fairArena_choose=} [properties] Properties to set
         */
        function sc_fairArena_choose(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new sc_fairArena_choose instance using the specified properties.
         * @function create
         * @memberof dice.sc_fairArena_choose
         * @static
         * @param {dice.Isc_fairArena_choose=} [properties] Properties to set
         * @returns {dice.sc_fairArena_choose} sc_fairArena_choose instance
         */
        sc_fairArena_choose.create = function create(properties) {
            return new sc_fairArena_choose(properties);
        };

        /**
         * Encodes the specified sc_fairArena_choose message. Does not implicitly {@link dice.sc_fairArena_choose.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_fairArena_choose
         * @static
         * @param {dice.Isc_fairArena_choose} message sc_fairArena_choose message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_fairArena_choose.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified sc_fairArena_choose message, length delimited. Does not implicitly {@link dice.sc_fairArena_choose.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_fairArena_choose
         * @static
         * @param {dice.Isc_fairArena_choose} message sc_fairArena_choose message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_fairArena_choose.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_fairArena_choose message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_fairArena_choose
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_fairArena_choose} sc_fairArena_choose
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_fairArena_choose.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_fairArena_choose();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_fairArena_choose message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_fairArena_choose
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_fairArena_choose} sc_fairArena_choose
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_fairArena_choose.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_fairArena_choose message.
         * @function verify
         * @memberof dice.sc_fairArena_choose
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_fairArena_choose.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return sc_fairArena_choose;
    })();

    dice.cs_fairArena_getReward = (function() {

        /**
         * Properties of a cs_fairArena_getReward.
         * @memberof dice
         * @interface Ics_fairArena_getReward
         * @property {string|null} [key] cs_fairArena_getReward key
         */

        /**
         * Constructs a new cs_fairArena_getReward.
         * @memberof dice
         * @classdesc Represents a cs_fairArena_getReward.
         * @implements Ics_fairArena_getReward
         * @constructor
         * @param {dice.Ics_fairArena_getReward=} [properties] Properties to set
         */
        function cs_fairArena_getReward(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_fairArena_getReward key.
         * @member {string} key
         * @memberof dice.cs_fairArena_getReward
         * @instance
         */
        cs_fairArena_getReward.prototype.key = "";

        /**
         * Creates a new cs_fairArena_getReward instance using the specified properties.
         * @function create
         * @memberof dice.cs_fairArena_getReward
         * @static
         * @param {dice.Ics_fairArena_getReward=} [properties] Properties to set
         * @returns {dice.cs_fairArena_getReward} cs_fairArena_getReward instance
         */
        cs_fairArena_getReward.create = function create(properties) {
            return new cs_fairArena_getReward(properties);
        };

        /**
         * Encodes the specified cs_fairArena_getReward message. Does not implicitly {@link dice.cs_fairArena_getReward.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_fairArena_getReward
         * @static
         * @param {dice.Ics_fairArena_getReward} message cs_fairArena_getReward message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_fairArena_getReward.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.key != null && message.hasOwnProperty("key"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.key);
            return writer;
        };

        /**
         * Encodes the specified cs_fairArena_getReward message, length delimited. Does not implicitly {@link dice.cs_fairArena_getReward.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_fairArena_getReward
         * @static
         * @param {dice.Ics_fairArena_getReward} message cs_fairArena_getReward message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_fairArena_getReward.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_fairArena_getReward message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_fairArena_getReward
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_fairArena_getReward} cs_fairArena_getReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_fairArena_getReward.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_fairArena_getReward();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.key = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_fairArena_getReward message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_fairArena_getReward
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_fairArena_getReward} cs_fairArena_getReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_fairArena_getReward.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_fairArena_getReward message.
         * @function verify
         * @memberof dice.cs_fairArena_getReward
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_fairArena_getReward.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.key != null && message.hasOwnProperty("key"))
                if (!$util.isString(message.key))
                    return "key: string expected";
            return null;
        };

        return cs_fairArena_getReward;
    })();

    dice.sc_fairArena_getReward = (function() {

        /**
         * Properties of a sc_fairArena_getReward.
         * @memberof dice
         * @interface Isc_fairArena_getReward
         * @property {string|null} [rewards] sc_fairArena_getReward rewards
         */

        /**
         * Constructs a new sc_fairArena_getReward.
         * @memberof dice
         * @classdesc Represents a sc_fairArena_getReward.
         * @implements Isc_fairArena_getReward
         * @constructor
         * @param {dice.Isc_fairArena_getReward=} [properties] Properties to set
         */
        function sc_fairArena_getReward(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * sc_fairArena_getReward rewards.
         * @member {string} rewards
         * @memberof dice.sc_fairArena_getReward
         * @instance
         */
        sc_fairArena_getReward.prototype.rewards = "";

        /**
         * Creates a new sc_fairArena_getReward instance using the specified properties.
         * @function create
         * @memberof dice.sc_fairArena_getReward
         * @static
         * @param {dice.Isc_fairArena_getReward=} [properties] Properties to set
         * @returns {dice.sc_fairArena_getReward} sc_fairArena_getReward instance
         */
        sc_fairArena_getReward.create = function create(properties) {
            return new sc_fairArena_getReward(properties);
        };

        /**
         * Encodes the specified sc_fairArena_getReward message. Does not implicitly {@link dice.sc_fairArena_getReward.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_fairArena_getReward
         * @static
         * @param {dice.Isc_fairArena_getReward} message sc_fairArena_getReward message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_fairArena_getReward.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.rewards);
            return writer;
        };

        /**
         * Encodes the specified sc_fairArena_getReward message, length delimited. Does not implicitly {@link dice.sc_fairArena_getReward.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_fairArena_getReward
         * @static
         * @param {dice.Isc_fairArena_getReward} message sc_fairArena_getReward message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_fairArena_getReward.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_fairArena_getReward message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_fairArena_getReward
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_fairArena_getReward} sc_fairArena_getReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_fairArena_getReward.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_fairArena_getReward();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.rewards = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_fairArena_getReward message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_fairArena_getReward
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_fairArena_getReward} sc_fairArena_getReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_fairArena_getReward.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_fairArena_getReward message.
         * @function verify
         * @memberof dice.sc_fairArena_getReward
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_fairArena_getReward.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                if (!$util.isString(message.rewards))
                    return "rewards: string expected";
            return null;
        };

        return sc_fairArena_getReward;
    })();

    dice.cs_fairArena_end = (function() {

        /**
         * Properties of a cs_fairArena_end.
         * @memberof dice
         * @interface Ics_fairArena_end
         */

        /**
         * Constructs a new cs_fairArena_end.
         * @memberof dice
         * @classdesc Represents a cs_fairArena_end.
         * @implements Ics_fairArena_end
         * @constructor
         * @param {dice.Ics_fairArena_end=} [properties] Properties to set
         */
        function cs_fairArena_end(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new cs_fairArena_end instance using the specified properties.
         * @function create
         * @memberof dice.cs_fairArena_end
         * @static
         * @param {dice.Ics_fairArena_end=} [properties] Properties to set
         * @returns {dice.cs_fairArena_end} cs_fairArena_end instance
         */
        cs_fairArena_end.create = function create(properties) {
            return new cs_fairArena_end(properties);
        };

        /**
         * Encodes the specified cs_fairArena_end message. Does not implicitly {@link dice.cs_fairArena_end.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_fairArena_end
         * @static
         * @param {dice.Ics_fairArena_end} message cs_fairArena_end message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_fairArena_end.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified cs_fairArena_end message, length delimited. Does not implicitly {@link dice.cs_fairArena_end.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_fairArena_end
         * @static
         * @param {dice.Ics_fairArena_end} message cs_fairArena_end message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_fairArena_end.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_fairArena_end message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_fairArena_end
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_fairArena_end} cs_fairArena_end
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_fairArena_end.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_fairArena_end();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_fairArena_end message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_fairArena_end
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_fairArena_end} cs_fairArena_end
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_fairArena_end.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_fairArena_end message.
         * @function verify
         * @memberof dice.cs_fairArena_end
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_fairArena_end.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return cs_fairArena_end;
    })();

    dice.sc_fairArena_end = (function() {

        /**
         * Properties of a sc_fairArena_end.
         * @memberof dice
         * @interface Isc_fairArena_end
         */

        /**
         * Constructs a new sc_fairArena_end.
         * @memberof dice
         * @classdesc Represents a sc_fairArena_end.
         * @implements Isc_fairArena_end
         * @constructor
         * @param {dice.Isc_fairArena_end=} [properties] Properties to set
         */
        function sc_fairArena_end(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new sc_fairArena_end instance using the specified properties.
         * @function create
         * @memberof dice.sc_fairArena_end
         * @static
         * @param {dice.Isc_fairArena_end=} [properties] Properties to set
         * @returns {dice.sc_fairArena_end} sc_fairArena_end instance
         */
        sc_fairArena_end.create = function create(properties) {
            return new sc_fairArena_end(properties);
        };

        /**
         * Encodes the specified sc_fairArena_end message. Does not implicitly {@link dice.sc_fairArena_end.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_fairArena_end
         * @static
         * @param {dice.Isc_fairArena_end} message sc_fairArena_end message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_fairArena_end.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified sc_fairArena_end message, length delimited. Does not implicitly {@link dice.sc_fairArena_end.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_fairArena_end
         * @static
         * @param {dice.Isc_fairArena_end} message sc_fairArena_end message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_fairArena_end.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_fairArena_end message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_fairArena_end
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_fairArena_end} sc_fairArena_end
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_fairArena_end.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_fairArena_end();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_fairArena_end message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_fairArena_end
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_fairArena_end} sc_fairArena_end
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_fairArena_end.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_fairArena_end message.
         * @function verify
         * @memberof dice.sc_fairArena_end
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_fairArena_end.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return sc_fairArena_end;
    })();

    dice.cs_signinfo_sign = (function() {

        /**
         * Properties of a cs_signinfo_sign.
         * @memberof dice
         * @interface Ics_signinfo_sign
         */

        /**
         * Constructs a new cs_signinfo_sign.
         * @memberof dice
         * @classdesc Represents a cs_signinfo_sign.
         * @implements Ics_signinfo_sign
         * @constructor
         * @param {dice.Ics_signinfo_sign=} [properties] Properties to set
         */
        function cs_signinfo_sign(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new cs_signinfo_sign instance using the specified properties.
         * @function create
         * @memberof dice.cs_signinfo_sign
         * @static
         * @param {dice.Ics_signinfo_sign=} [properties] Properties to set
         * @returns {dice.cs_signinfo_sign} cs_signinfo_sign instance
         */
        cs_signinfo_sign.create = function create(properties) {
            return new cs_signinfo_sign(properties);
        };

        /**
         * Encodes the specified cs_signinfo_sign message. Does not implicitly {@link dice.cs_signinfo_sign.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_signinfo_sign
         * @static
         * @param {dice.Ics_signinfo_sign} message cs_signinfo_sign message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_signinfo_sign.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified cs_signinfo_sign message, length delimited. Does not implicitly {@link dice.cs_signinfo_sign.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_signinfo_sign
         * @static
         * @param {dice.Ics_signinfo_sign} message cs_signinfo_sign message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_signinfo_sign.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_signinfo_sign message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_signinfo_sign
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_signinfo_sign} cs_signinfo_sign
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_signinfo_sign.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_signinfo_sign();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_signinfo_sign message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_signinfo_sign
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_signinfo_sign} cs_signinfo_sign
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_signinfo_sign.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_signinfo_sign message.
         * @function verify
         * @memberof dice.cs_signinfo_sign
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_signinfo_sign.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return cs_signinfo_sign;
    })();

    dice.sc_signinfo_sign = (function() {

        /**
         * Properties of a sc_signinfo_sign.
         * @memberof dice
         * @interface Isc_signinfo_sign
         * @property {string|null} [rewards] sc_signinfo_sign rewards
         */

        /**
         * Constructs a new sc_signinfo_sign.
         * @memberof dice
         * @classdesc Represents a sc_signinfo_sign.
         * @implements Isc_signinfo_sign
         * @constructor
         * @param {dice.Isc_signinfo_sign=} [properties] Properties to set
         */
        function sc_signinfo_sign(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * sc_signinfo_sign rewards.
         * @member {string} rewards
         * @memberof dice.sc_signinfo_sign
         * @instance
         */
        sc_signinfo_sign.prototype.rewards = "";

        /**
         * Creates a new sc_signinfo_sign instance using the specified properties.
         * @function create
         * @memberof dice.sc_signinfo_sign
         * @static
         * @param {dice.Isc_signinfo_sign=} [properties] Properties to set
         * @returns {dice.sc_signinfo_sign} sc_signinfo_sign instance
         */
        sc_signinfo_sign.create = function create(properties) {
            return new sc_signinfo_sign(properties);
        };

        /**
         * Encodes the specified sc_signinfo_sign message. Does not implicitly {@link dice.sc_signinfo_sign.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_signinfo_sign
         * @static
         * @param {dice.Isc_signinfo_sign} message sc_signinfo_sign message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_signinfo_sign.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.rewards);
            return writer;
        };

        /**
         * Encodes the specified sc_signinfo_sign message, length delimited. Does not implicitly {@link dice.sc_signinfo_sign.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_signinfo_sign
         * @static
         * @param {dice.Isc_signinfo_sign} message sc_signinfo_sign message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_signinfo_sign.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_signinfo_sign message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_signinfo_sign
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_signinfo_sign} sc_signinfo_sign
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_signinfo_sign.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_signinfo_sign();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.rewards = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_signinfo_sign message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_signinfo_sign
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_signinfo_sign} sc_signinfo_sign
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_signinfo_sign.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_signinfo_sign message.
         * @function verify
         * @memberof dice.sc_signinfo_sign
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_signinfo_sign.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                if (!$util.isString(message.rewards))
                    return "rewards: string expected";
            return null;
        };

        return sc_signinfo_sign;
    })();

    dice.cs_signinfo_getFirstRecharge = (function() {

        /**
         * Properties of a cs_signinfo_getFirstRecharge.
         * @memberof dice
         * @interface Ics_signinfo_getFirstRecharge
         */

        /**
         * Constructs a new cs_signinfo_getFirstRecharge.
         * @memberof dice
         * @classdesc Represents a cs_signinfo_getFirstRecharge.
         * @implements Ics_signinfo_getFirstRecharge
         * @constructor
         * @param {dice.Ics_signinfo_getFirstRecharge=} [properties] Properties to set
         */
        function cs_signinfo_getFirstRecharge(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new cs_signinfo_getFirstRecharge instance using the specified properties.
         * @function create
         * @memberof dice.cs_signinfo_getFirstRecharge
         * @static
         * @param {dice.Ics_signinfo_getFirstRecharge=} [properties] Properties to set
         * @returns {dice.cs_signinfo_getFirstRecharge} cs_signinfo_getFirstRecharge instance
         */
        cs_signinfo_getFirstRecharge.create = function create(properties) {
            return new cs_signinfo_getFirstRecharge(properties);
        };

        /**
         * Encodes the specified cs_signinfo_getFirstRecharge message. Does not implicitly {@link dice.cs_signinfo_getFirstRecharge.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_signinfo_getFirstRecharge
         * @static
         * @param {dice.Ics_signinfo_getFirstRecharge} message cs_signinfo_getFirstRecharge message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_signinfo_getFirstRecharge.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified cs_signinfo_getFirstRecharge message, length delimited. Does not implicitly {@link dice.cs_signinfo_getFirstRecharge.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_signinfo_getFirstRecharge
         * @static
         * @param {dice.Ics_signinfo_getFirstRecharge} message cs_signinfo_getFirstRecharge message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_signinfo_getFirstRecharge.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_signinfo_getFirstRecharge message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_signinfo_getFirstRecharge
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_signinfo_getFirstRecharge} cs_signinfo_getFirstRecharge
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_signinfo_getFirstRecharge.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_signinfo_getFirstRecharge();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_signinfo_getFirstRecharge message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_signinfo_getFirstRecharge
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_signinfo_getFirstRecharge} cs_signinfo_getFirstRecharge
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_signinfo_getFirstRecharge.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_signinfo_getFirstRecharge message.
         * @function verify
         * @memberof dice.cs_signinfo_getFirstRecharge
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_signinfo_getFirstRecharge.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return cs_signinfo_getFirstRecharge;
    })();

    dice.sc_signinfo_getFirstRecharge = (function() {

        /**
         * Properties of a sc_signinfo_getFirstRecharge.
         * @memberof dice
         * @interface Isc_signinfo_getFirstRecharge
         * @property {string|null} [rewards] sc_signinfo_getFirstRecharge rewards
         */

        /**
         * Constructs a new sc_signinfo_getFirstRecharge.
         * @memberof dice
         * @classdesc Represents a sc_signinfo_getFirstRecharge.
         * @implements Isc_signinfo_getFirstRecharge
         * @constructor
         * @param {dice.Isc_signinfo_getFirstRecharge=} [properties] Properties to set
         */
        function sc_signinfo_getFirstRecharge(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * sc_signinfo_getFirstRecharge rewards.
         * @member {string} rewards
         * @memberof dice.sc_signinfo_getFirstRecharge
         * @instance
         */
        sc_signinfo_getFirstRecharge.prototype.rewards = "";

        /**
         * Creates a new sc_signinfo_getFirstRecharge instance using the specified properties.
         * @function create
         * @memberof dice.sc_signinfo_getFirstRecharge
         * @static
         * @param {dice.Isc_signinfo_getFirstRecharge=} [properties] Properties to set
         * @returns {dice.sc_signinfo_getFirstRecharge} sc_signinfo_getFirstRecharge instance
         */
        sc_signinfo_getFirstRecharge.create = function create(properties) {
            return new sc_signinfo_getFirstRecharge(properties);
        };

        /**
         * Encodes the specified sc_signinfo_getFirstRecharge message. Does not implicitly {@link dice.sc_signinfo_getFirstRecharge.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_signinfo_getFirstRecharge
         * @static
         * @param {dice.Isc_signinfo_getFirstRecharge} message sc_signinfo_getFirstRecharge message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_signinfo_getFirstRecharge.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.rewards);
            return writer;
        };

        /**
         * Encodes the specified sc_signinfo_getFirstRecharge message, length delimited. Does not implicitly {@link dice.sc_signinfo_getFirstRecharge.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_signinfo_getFirstRecharge
         * @static
         * @param {dice.Isc_signinfo_getFirstRecharge} message sc_signinfo_getFirstRecharge message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_signinfo_getFirstRecharge.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_signinfo_getFirstRecharge message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_signinfo_getFirstRecharge
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_signinfo_getFirstRecharge} sc_signinfo_getFirstRecharge
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_signinfo_getFirstRecharge.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_signinfo_getFirstRecharge();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.rewards = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_signinfo_getFirstRecharge message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_signinfo_getFirstRecharge
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_signinfo_getFirstRecharge} sc_signinfo_getFirstRecharge
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_signinfo_getFirstRecharge.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_signinfo_getFirstRecharge message.
         * @function verify
         * @memberof dice.sc_signinfo_getFirstRecharge
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_signinfo_getFirstRecharge.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                if (!$util.isString(message.rewards))
                    return "rewards: string expected";
            return null;
        };

        return sc_signinfo_getFirstRecharge;
    })();

    dice.cs_inviteFriend_bind = (function() {

        /**
         * Properties of a cs_inviteFriend_bind.
         * @memberof dice
         * @interface Ics_inviteFriend_bind
         * @property {string|null} [bindCode] cs_inviteFriend_bind bindCode
         */

        /**
         * Constructs a new cs_inviteFriend_bind.
         * @memberof dice
         * @classdesc Represents a cs_inviteFriend_bind.
         * @implements Ics_inviteFriend_bind
         * @constructor
         * @param {dice.Ics_inviteFriend_bind=} [properties] Properties to set
         */
        function cs_inviteFriend_bind(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_inviteFriend_bind bindCode.
         * @member {string} bindCode
         * @memberof dice.cs_inviteFriend_bind
         * @instance
         */
        cs_inviteFriend_bind.prototype.bindCode = "";

        /**
         * Creates a new cs_inviteFriend_bind instance using the specified properties.
         * @function create
         * @memberof dice.cs_inviteFriend_bind
         * @static
         * @param {dice.Ics_inviteFriend_bind=} [properties] Properties to set
         * @returns {dice.cs_inviteFriend_bind} cs_inviteFriend_bind instance
         */
        cs_inviteFriend_bind.create = function create(properties) {
            return new cs_inviteFriend_bind(properties);
        };

        /**
         * Encodes the specified cs_inviteFriend_bind message. Does not implicitly {@link dice.cs_inviteFriend_bind.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_inviteFriend_bind
         * @static
         * @param {dice.Ics_inviteFriend_bind} message cs_inviteFriend_bind message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_inviteFriend_bind.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.bindCode != null && message.hasOwnProperty("bindCode"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.bindCode);
            return writer;
        };

        /**
         * Encodes the specified cs_inviteFriend_bind message, length delimited. Does not implicitly {@link dice.cs_inviteFriend_bind.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_inviteFriend_bind
         * @static
         * @param {dice.Ics_inviteFriend_bind} message cs_inviteFriend_bind message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_inviteFriend_bind.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_inviteFriend_bind message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_inviteFriend_bind
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_inviteFriend_bind} cs_inviteFriend_bind
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_inviteFriend_bind.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_inviteFriend_bind();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.bindCode = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_inviteFriend_bind message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_inviteFriend_bind
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_inviteFriend_bind} cs_inviteFriend_bind
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_inviteFriend_bind.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_inviteFriend_bind message.
         * @function verify
         * @memberof dice.cs_inviteFriend_bind
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_inviteFriend_bind.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.bindCode != null && message.hasOwnProperty("bindCode"))
                if (!$util.isString(message.bindCode))
                    return "bindCode: string expected";
            return null;
        };

        return cs_inviteFriend_bind;
    })();

    dice.sc_inviteFriend_bind = (function() {

        /**
         * Properties of a sc_inviteFriend_bind.
         * @memberof dice
         * @interface Isc_inviteFriend_bind
         * @property {string|null} [rewards] sc_inviteFriend_bind rewards
         * @property {number|null} [code] sc_inviteFriend_bind code
         * @property {boolean|null} [bindFlag] sc_inviteFriend_bind bindFlag
         */

        /**
         * Constructs a new sc_inviteFriend_bind.
         * @memberof dice
         * @classdesc Represents a sc_inviteFriend_bind.
         * @implements Isc_inviteFriend_bind
         * @constructor
         * @param {dice.Isc_inviteFriend_bind=} [properties] Properties to set
         */
        function sc_inviteFriend_bind(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * sc_inviteFriend_bind rewards.
         * @member {string} rewards
         * @memberof dice.sc_inviteFriend_bind
         * @instance
         */
        sc_inviteFriend_bind.prototype.rewards = "";

        /**
         * sc_inviteFriend_bind code.
         * @member {number} code
         * @memberof dice.sc_inviteFriend_bind
         * @instance
         */
        sc_inviteFriend_bind.prototype.code = 0;

        /**
         * sc_inviteFriend_bind bindFlag.
         * @member {boolean} bindFlag
         * @memberof dice.sc_inviteFriend_bind
         * @instance
         */
        sc_inviteFriend_bind.prototype.bindFlag = false;

        /**
         * Creates a new sc_inviteFriend_bind instance using the specified properties.
         * @function create
         * @memberof dice.sc_inviteFriend_bind
         * @static
         * @param {dice.Isc_inviteFriend_bind=} [properties] Properties to set
         * @returns {dice.sc_inviteFriend_bind} sc_inviteFriend_bind instance
         */
        sc_inviteFriend_bind.create = function create(properties) {
            return new sc_inviteFriend_bind(properties);
        };

        /**
         * Encodes the specified sc_inviteFriend_bind message. Does not implicitly {@link dice.sc_inviteFriend_bind.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_inviteFriend_bind
         * @static
         * @param {dice.Isc_inviteFriend_bind} message sc_inviteFriend_bind message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_inviteFriend_bind.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.rewards);
            if (message.code != null && message.hasOwnProperty("code"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.code);
            if (message.bindFlag != null && message.hasOwnProperty("bindFlag"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.bindFlag);
            return writer;
        };

        /**
         * Encodes the specified sc_inviteFriend_bind message, length delimited. Does not implicitly {@link dice.sc_inviteFriend_bind.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_inviteFriend_bind
         * @static
         * @param {dice.Isc_inviteFriend_bind} message sc_inviteFriend_bind message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_inviteFriend_bind.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_inviteFriend_bind message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_inviteFriend_bind
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_inviteFriend_bind} sc_inviteFriend_bind
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_inviteFriend_bind.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_inviteFriend_bind();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.rewards = reader.string();
                    break;
                case 2:
                    message.code = reader.int32();
                    break;
                case 3:
                    message.bindFlag = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_inviteFriend_bind message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_inviteFriend_bind
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_inviteFriend_bind} sc_inviteFriend_bind
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_inviteFriend_bind.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_inviteFriend_bind message.
         * @function verify
         * @memberof dice.sc_inviteFriend_bind
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_inviteFriend_bind.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                if (!$util.isString(message.rewards))
                    return "rewards: string expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.bindFlag != null && message.hasOwnProperty("bindFlag"))
                if (typeof message.bindFlag !== "boolean")
                    return "bindFlag: boolean expected";
            return null;
        };

        return sc_inviteFriend_bind;
    })();

    dice.cs_inviteFriend_getReward = (function() {

        /**
         * Properties of a cs_inviteFriend_getReward.
         * @memberof dice
         * @interface Ics_inviteFriend_getReward
         * @property {string|null} [rkey] cs_inviteFriend_getReward rkey
         */

        /**
         * Constructs a new cs_inviteFriend_getReward.
         * @memberof dice
         * @classdesc Represents a cs_inviteFriend_getReward.
         * @implements Ics_inviteFriend_getReward
         * @constructor
         * @param {dice.Ics_inviteFriend_getReward=} [properties] Properties to set
         */
        function cs_inviteFriend_getReward(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cs_inviteFriend_getReward rkey.
         * @member {string} rkey
         * @memberof dice.cs_inviteFriend_getReward
         * @instance
         */
        cs_inviteFriend_getReward.prototype.rkey = "";

        /**
         * Creates a new cs_inviteFriend_getReward instance using the specified properties.
         * @function create
         * @memberof dice.cs_inviteFriend_getReward
         * @static
         * @param {dice.Ics_inviteFriend_getReward=} [properties] Properties to set
         * @returns {dice.cs_inviteFriend_getReward} cs_inviteFriend_getReward instance
         */
        cs_inviteFriend_getReward.create = function create(properties) {
            return new cs_inviteFriend_getReward(properties);
        };

        /**
         * Encodes the specified cs_inviteFriend_getReward message. Does not implicitly {@link dice.cs_inviteFriend_getReward.verify|verify} messages.
         * @function encode
         * @memberof dice.cs_inviteFriend_getReward
         * @static
         * @param {dice.Ics_inviteFriend_getReward} message cs_inviteFriend_getReward message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_inviteFriend_getReward.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.rkey != null && message.hasOwnProperty("rkey"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.rkey);
            return writer;
        };

        /**
         * Encodes the specified cs_inviteFriend_getReward message, length delimited. Does not implicitly {@link dice.cs_inviteFriend_getReward.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.cs_inviteFriend_getReward
         * @static
         * @param {dice.Ics_inviteFriend_getReward} message cs_inviteFriend_getReward message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        cs_inviteFriend_getReward.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a cs_inviteFriend_getReward message from the specified reader or buffer.
         * @function decode
         * @memberof dice.cs_inviteFriend_getReward
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.cs_inviteFriend_getReward} cs_inviteFriend_getReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_inviteFriend_getReward.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.cs_inviteFriend_getReward();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.rkey = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a cs_inviteFriend_getReward message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.cs_inviteFriend_getReward
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.cs_inviteFriend_getReward} cs_inviteFriend_getReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        cs_inviteFriend_getReward.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a cs_inviteFriend_getReward message.
         * @function verify
         * @memberof dice.cs_inviteFriend_getReward
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        cs_inviteFriend_getReward.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.rkey != null && message.hasOwnProperty("rkey"))
                if (!$util.isString(message.rkey))
                    return "rkey: string expected";
            return null;
        };

        return cs_inviteFriend_getReward;
    })();

    dice.sc_inviteFriend_getReward = (function() {

        /**
         * Properties of a sc_inviteFriend_getReward.
         * @memberof dice
         * @interface Isc_inviteFriend_getReward
         * @property {string|null} [rewards] sc_inviteFriend_getReward rewards
         */

        /**
         * Constructs a new sc_inviteFriend_getReward.
         * @memberof dice
         * @classdesc Represents a sc_inviteFriend_getReward.
         * @implements Isc_inviteFriend_getReward
         * @constructor
         * @param {dice.Isc_inviteFriend_getReward=} [properties] Properties to set
         */
        function sc_inviteFriend_getReward(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * sc_inviteFriend_getReward rewards.
         * @member {string} rewards
         * @memberof dice.sc_inviteFriend_getReward
         * @instance
         */
        sc_inviteFriend_getReward.prototype.rewards = "";

        /**
         * Creates a new sc_inviteFriend_getReward instance using the specified properties.
         * @function create
         * @memberof dice.sc_inviteFriend_getReward
         * @static
         * @param {dice.Isc_inviteFriend_getReward=} [properties] Properties to set
         * @returns {dice.sc_inviteFriend_getReward} sc_inviteFriend_getReward instance
         */
        sc_inviteFriend_getReward.create = function create(properties) {
            return new sc_inviteFriend_getReward(properties);
        };

        /**
         * Encodes the specified sc_inviteFriend_getReward message. Does not implicitly {@link dice.sc_inviteFriend_getReward.verify|verify} messages.
         * @function encode
         * @memberof dice.sc_inviteFriend_getReward
         * @static
         * @param {dice.Isc_inviteFriend_getReward} message sc_inviteFriend_getReward message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_inviteFriend_getReward.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.rewards);
            return writer;
        };

        /**
         * Encodes the specified sc_inviteFriend_getReward message, length delimited. Does not implicitly {@link dice.sc_inviteFriend_getReward.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.sc_inviteFriend_getReward
         * @static
         * @param {dice.Isc_inviteFriend_getReward} message sc_inviteFriend_getReward message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        sc_inviteFriend_getReward.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a sc_inviteFriend_getReward message from the specified reader or buffer.
         * @function decode
         * @memberof dice.sc_inviteFriend_getReward
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.sc_inviteFriend_getReward} sc_inviteFriend_getReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_inviteFriend_getReward.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.sc_inviteFriend_getReward();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.rewards = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a sc_inviteFriend_getReward message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.sc_inviteFriend_getReward
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.sc_inviteFriend_getReward} sc_inviteFriend_getReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        sc_inviteFriend_getReward.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a sc_inviteFriend_getReward message.
         * @function verify
         * @memberof dice.sc_inviteFriend_getReward
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        sc_inviteFriend_getReward.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                if (!$util.isString(message.rewards))
                    return "rewards: string expected";
            return null;
        };

        return sc_inviteFriend_getReward;
    })();

    dice.model_userinfo = (function() {

        /**
         * Properties of a model_userinfo.
         * @memberof dice
         * @interface Imodel_userinfo
         * @property {number|null} [uid] model_userinfo uid
         * @property {string|null} [name] model_userinfo name
         * @property {number|null} [mygid] model_userinfo mygid
         * @property {string|null} [mygname] model_userinfo mygname
         * @property {number|null} [level] model_userinfo level
         * @property {number|null} [score] model_userinfo score
         * @property {number|null} [maxscore] model_userinfo maxscore
         * @property {number|null} [gold] model_userinfo gold
         * @property {number|null} [gem] model_userinfo gem
         * @property {number|null} [card] model_userinfo card
         * @property {number|null} [win] model_userinfo win
         * @property {number|null} [lose] model_userinfo lose
         * @property {number|null} [sumb] model_userinfo sumb
         * @property {number|null} [maxturn] model_userinfo maxturn
         * @property {number|null} [buyg] model_userinfo buyg
         * @property {number|null} [buyt] model_userinfo buyt
         * @property {number|null} [buyn] model_userinfo buyn
         * @property {number|null} [freeg] model_userinfo freeg
         */

        /**
         * Constructs a new model_userinfo.
         * @memberof dice
         * @classdesc Represents a model_userinfo.
         * @implements Imodel_userinfo
         * @constructor
         * @param {dice.Imodel_userinfo=} [properties] Properties to set
         */
        function model_userinfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * model_userinfo uid.
         * @member {number} uid
         * @memberof dice.model_userinfo
         * @instance
         */
        model_userinfo.prototype.uid = 0;

        /**
         * model_userinfo name.
         * @member {string} name
         * @memberof dice.model_userinfo
         * @instance
         */
        model_userinfo.prototype.name = "";

        /**
         * model_userinfo mygid.
         * @member {number} mygid
         * @memberof dice.model_userinfo
         * @instance
         */
        model_userinfo.prototype.mygid = 0;

        /**
         * model_userinfo mygname.
         * @member {string} mygname
         * @memberof dice.model_userinfo
         * @instance
         */
        model_userinfo.prototype.mygname = "";

        /**
         * model_userinfo level.
         * @member {number} level
         * @memberof dice.model_userinfo
         * @instance
         */
        model_userinfo.prototype.level = 0;

        /**
         * model_userinfo score.
         * @member {number} score
         * @memberof dice.model_userinfo
         * @instance
         */
        model_userinfo.prototype.score = 0;

        /**
         * model_userinfo maxscore.
         * @member {number} maxscore
         * @memberof dice.model_userinfo
         * @instance
         */
        model_userinfo.prototype.maxscore = 0;

        /**
         * model_userinfo gold.
         * @member {number} gold
         * @memberof dice.model_userinfo
         * @instance
         */
        model_userinfo.prototype.gold = 0;

        /**
         * model_userinfo gem.
         * @member {number} gem
         * @memberof dice.model_userinfo
         * @instance
         */
        model_userinfo.prototype.gem = 0;

        /**
         * model_userinfo card.
         * @member {number} card
         * @memberof dice.model_userinfo
         * @instance
         */
        model_userinfo.prototype.card = 0;

        /**
         * model_userinfo win.
         * @member {number} win
         * @memberof dice.model_userinfo
         * @instance
         */
        model_userinfo.prototype.win = 0;

        /**
         * model_userinfo lose.
         * @member {number} lose
         * @memberof dice.model_userinfo
         * @instance
         */
        model_userinfo.prototype.lose = 0;

        /**
         * model_userinfo sumb.
         * @member {number} sumb
         * @memberof dice.model_userinfo
         * @instance
         */
        model_userinfo.prototype.sumb = 0;

        /**
         * model_userinfo maxturn.
         * @member {number} maxturn
         * @memberof dice.model_userinfo
         * @instance
         */
        model_userinfo.prototype.maxturn = 0;

        /**
         * model_userinfo buyg.
         * @member {number} buyg
         * @memberof dice.model_userinfo
         * @instance
         */
        model_userinfo.prototype.buyg = 0;

        /**
         * model_userinfo buyt.
         * @member {number} buyt
         * @memberof dice.model_userinfo
         * @instance
         */
        model_userinfo.prototype.buyt = 0;

        /**
         * model_userinfo buyn.
         * @member {number} buyn
         * @memberof dice.model_userinfo
         * @instance
         */
        model_userinfo.prototype.buyn = 0;

        /**
         * model_userinfo freeg.
         * @member {number} freeg
         * @memberof dice.model_userinfo
         * @instance
         */
        model_userinfo.prototype.freeg = 0;

        /**
         * Creates a new model_userinfo instance using the specified properties.
         * @function create
         * @memberof dice.model_userinfo
         * @static
         * @param {dice.Imodel_userinfo=} [properties] Properties to set
         * @returns {dice.model_userinfo} model_userinfo instance
         */
        model_userinfo.create = function create(properties) {
            return new model_userinfo(properties);
        };

        /**
         * Encodes the specified model_userinfo message. Does not implicitly {@link dice.model_userinfo.verify|verify} messages.
         * @function encode
         * @memberof dice.model_userinfo
         * @static
         * @param {dice.Imodel_userinfo} message model_userinfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        model_userinfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uid != null && message.hasOwnProperty("uid"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uid);
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.mygid != null && message.hasOwnProperty("mygid"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.mygid);
            if (message.mygname != null && message.hasOwnProperty("mygname"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.mygname);
            if (message.level != null && message.hasOwnProperty("level"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.level);
            if (message.score != null && message.hasOwnProperty("score"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.score);
            if (message.maxscore != null && message.hasOwnProperty("maxscore"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.maxscore);
            if (message.gold != null && message.hasOwnProperty("gold"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.gold);
            if (message.gem != null && message.hasOwnProperty("gem"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.gem);
            if (message.card != null && message.hasOwnProperty("card"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.card);
            if (message.win != null && message.hasOwnProperty("win"))
                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.win);
            if (message.lose != null && message.hasOwnProperty("lose"))
                writer.uint32(/* id 12, wireType 0 =*/96).int32(message.lose);
            if (message.sumb != null && message.hasOwnProperty("sumb"))
                writer.uint32(/* id 13, wireType 0 =*/104).int32(message.sumb);
            if (message.maxturn != null && message.hasOwnProperty("maxturn"))
                writer.uint32(/* id 14, wireType 0 =*/112).int32(message.maxturn);
            if (message.buyg != null && message.hasOwnProperty("buyg"))
                writer.uint32(/* id 15, wireType 0 =*/120).int32(message.buyg);
            if (message.buyt != null && message.hasOwnProperty("buyt"))
                writer.uint32(/* id 16, wireType 0 =*/128).int32(message.buyt);
            if (message.buyn != null && message.hasOwnProperty("buyn"))
                writer.uint32(/* id 17, wireType 0 =*/136).int32(message.buyn);
            if (message.freeg != null && message.hasOwnProperty("freeg"))
                writer.uint32(/* id 18, wireType 0 =*/144).int32(message.freeg);
            return writer;
        };

        /**
         * Encodes the specified model_userinfo message, length delimited. Does not implicitly {@link dice.model_userinfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.model_userinfo
         * @static
         * @param {dice.Imodel_userinfo} message model_userinfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        model_userinfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a model_userinfo message from the specified reader or buffer.
         * @function decode
         * @memberof dice.model_userinfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.model_userinfo} model_userinfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        model_userinfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.model_userinfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uid = reader.int32();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.mygid = reader.int32();
                    break;
                case 4:
                    message.mygname = reader.string();
                    break;
                case 5:
                    message.level = reader.int32();
                    break;
                case 6:
                    message.score = reader.int32();
                    break;
                case 7:
                    message.maxscore = reader.int32();
                    break;
                case 8:
                    message.gold = reader.int32();
                    break;
                case 9:
                    message.gem = reader.int32();
                    break;
                case 10:
                    message.card = reader.int32();
                    break;
                case 11:
                    message.win = reader.int32();
                    break;
                case 12:
                    message.lose = reader.int32();
                    break;
                case 13:
                    message.sumb = reader.int32();
                    break;
                case 14:
                    message.maxturn = reader.int32();
                    break;
                case 15:
                    message.buyg = reader.int32();
                    break;
                case 16:
                    message.buyt = reader.int32();
                    break;
                case 17:
                    message.buyn = reader.int32();
                    break;
                case 18:
                    message.freeg = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a model_userinfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.model_userinfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.model_userinfo} model_userinfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        model_userinfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a model_userinfo message.
         * @function verify
         * @memberof dice.model_userinfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        model_userinfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!$util.isInteger(message.uid))
                    return "uid: integer expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.mygid != null && message.hasOwnProperty("mygid"))
                if (!$util.isInteger(message.mygid))
                    return "mygid: integer expected";
            if (message.mygname != null && message.hasOwnProperty("mygname"))
                if (!$util.isString(message.mygname))
                    return "mygname: string expected";
            if (message.level != null && message.hasOwnProperty("level"))
                if (!$util.isInteger(message.level))
                    return "level: integer expected";
            if (message.score != null && message.hasOwnProperty("score"))
                if (!$util.isInteger(message.score))
                    return "score: integer expected";
            if (message.maxscore != null && message.hasOwnProperty("maxscore"))
                if (!$util.isInteger(message.maxscore))
                    return "maxscore: integer expected";
            if (message.gold != null && message.hasOwnProperty("gold"))
                if (!$util.isInteger(message.gold))
                    return "gold: integer expected";
            if (message.gem != null && message.hasOwnProperty("gem"))
                if (!$util.isInteger(message.gem))
                    return "gem: integer expected";
            if (message.card != null && message.hasOwnProperty("card"))
                if (!$util.isInteger(message.card))
                    return "card: integer expected";
            if (message.win != null && message.hasOwnProperty("win"))
                if (!$util.isInteger(message.win))
                    return "win: integer expected";
            if (message.lose != null && message.hasOwnProperty("lose"))
                if (!$util.isInteger(message.lose))
                    return "lose: integer expected";
            if (message.sumb != null && message.hasOwnProperty("sumb"))
                if (!$util.isInteger(message.sumb))
                    return "sumb: integer expected";
            if (message.maxturn != null && message.hasOwnProperty("maxturn"))
                if (!$util.isInteger(message.maxturn))
                    return "maxturn: integer expected";
            if (message.buyg != null && message.hasOwnProperty("buyg"))
                if (!$util.isInteger(message.buyg))
                    return "buyg: integer expected";
            if (message.buyt != null && message.hasOwnProperty("buyt"))
                if (!$util.isInteger(message.buyt))
                    return "buyt: integer expected";
            if (message.buyn != null && message.hasOwnProperty("buyn"))
                if (!$util.isInteger(message.buyn))
                    return "buyn: integer expected";
            if (message.freeg != null && message.hasOwnProperty("freeg"))
                if (!$util.isInteger(message.freeg))
                    return "freeg: integer expected";
            return null;
        };

        return model_userinfo;
    })();

    dice.model_dice = (function() {

        /**
         * Properties of a model_dice.
         * @memberof dice
         * @interface Imodel_dice
         * @property {Object.<string,dice.model_dice.IDiceInfo>|null} [info] model_dice info
         * @property {number|null} [crivalue] model_dice crivalue
         */

        /**
         * Constructs a new model_dice.
         * @memberof dice
         * @classdesc Represents a model_dice.
         * @implements Imodel_dice
         * @constructor
         * @param {dice.Imodel_dice=} [properties] Properties to set
         */
        function model_dice(properties) {
            this.info = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * model_dice info.
         * @member {Object.<string,dice.model_dice.IDiceInfo>} info
         * @memberof dice.model_dice
         * @instance
         */
        model_dice.prototype.info = $util.emptyObject;

        /**
         * model_dice crivalue.
         * @member {number} crivalue
         * @memberof dice.model_dice
         * @instance
         */
        model_dice.prototype.crivalue = 0;

        /**
         * Creates a new model_dice instance using the specified properties.
         * @function create
         * @memberof dice.model_dice
         * @static
         * @param {dice.Imodel_dice=} [properties] Properties to set
         * @returns {dice.model_dice} model_dice instance
         */
        model_dice.create = function create(properties) {
            return new model_dice(properties);
        };

        /**
         * Encodes the specified model_dice message. Does not implicitly {@link dice.model_dice.verify|verify} messages.
         * @function encode
         * @memberof dice.model_dice
         * @static
         * @param {dice.Imodel_dice} message model_dice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        model_dice.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.info != null && message.hasOwnProperty("info"))
                for (var keys = Object.keys(message.info), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                    $root.dice.model_dice.DiceInfo.encode(message.info[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                }
            if (message.crivalue != null && message.hasOwnProperty("crivalue"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.crivalue);
            return writer;
        };

        /**
         * Encodes the specified model_dice message, length delimited. Does not implicitly {@link dice.model_dice.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.model_dice
         * @static
         * @param {dice.Imodel_dice} message model_dice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        model_dice.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a model_dice message from the specified reader or buffer.
         * @function decode
         * @memberof dice.model_dice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.model_dice} model_dice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        model_dice.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.model_dice(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    reader.skip().pos++;
                    if (message.info === $util.emptyObject)
                        message.info = {};
                    key = reader.string();
                    reader.pos++;
                    message.info[key] = $root.dice.model_dice.DiceInfo.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.crivalue = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a model_dice message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.model_dice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.model_dice} model_dice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        model_dice.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a model_dice message.
         * @function verify
         * @memberof dice.model_dice
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        model_dice.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.info != null && message.hasOwnProperty("info")) {
                if (!$util.isObject(message.info))
                    return "info: object expected";
                var key = Object.keys(message.info);
                for (var i = 0; i < key.length; ++i) {
                    var error = $root.dice.model_dice.DiceInfo.verify(message.info[key[i]]);
                    if (error)
                        return "info." + error;
                }
            }
            if (message.crivalue != null && message.hasOwnProperty("crivalue"))
                if (!$util.isInteger(message.crivalue))
                    return "crivalue: integer expected";
            return null;
        };

        model_dice.DiceInfo = (function() {

            /**
             * Properties of a DiceInfo.
             * @memberof dice.model_dice
             * @interface IDiceInfo
             * @property {number|null} [lv] DiceInfo lv
             * @property {number|null} [num] DiceInfo num
             */

            /**
             * Constructs a new DiceInfo.
             * @memberof dice.model_dice
             * @classdesc Represents a DiceInfo.
             * @implements IDiceInfo
             * @constructor
             * @param {dice.model_dice.IDiceInfo=} [properties] Properties to set
             */
            function DiceInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DiceInfo lv.
             * @member {number} lv
             * @memberof dice.model_dice.DiceInfo
             * @instance
             */
            DiceInfo.prototype.lv = 0;

            /**
             * DiceInfo num.
             * @member {number} num
             * @memberof dice.model_dice.DiceInfo
             * @instance
             */
            DiceInfo.prototype.num = 0;

            /**
             * Creates a new DiceInfo instance using the specified properties.
             * @function create
             * @memberof dice.model_dice.DiceInfo
             * @static
             * @param {dice.model_dice.IDiceInfo=} [properties] Properties to set
             * @returns {dice.model_dice.DiceInfo} DiceInfo instance
             */
            DiceInfo.create = function create(properties) {
                return new DiceInfo(properties);
            };

            /**
             * Encodes the specified DiceInfo message. Does not implicitly {@link dice.model_dice.DiceInfo.verify|verify} messages.
             * @function encode
             * @memberof dice.model_dice.DiceInfo
             * @static
             * @param {dice.model_dice.IDiceInfo} message DiceInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DiceInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.lv != null && message.hasOwnProperty("lv"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.lv);
                if (message.num != null && message.hasOwnProperty("num"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.num);
                return writer;
            };

            /**
             * Encodes the specified DiceInfo message, length delimited. Does not implicitly {@link dice.model_dice.DiceInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dice.model_dice.DiceInfo
             * @static
             * @param {dice.model_dice.IDiceInfo} message DiceInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DiceInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DiceInfo message from the specified reader or buffer.
             * @function decode
             * @memberof dice.model_dice.DiceInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dice.model_dice.DiceInfo} DiceInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DiceInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.model_dice.DiceInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.lv = reader.int32();
                        break;
                    case 2:
                        message.num = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DiceInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dice.model_dice.DiceInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dice.model_dice.DiceInfo} DiceInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DiceInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DiceInfo message.
             * @function verify
             * @memberof dice.model_dice.DiceInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DiceInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.lv != null && message.hasOwnProperty("lv"))
                    if (!$util.isInteger(message.lv))
                        return "lv: integer expected";
                if (message.num != null && message.hasOwnProperty("num"))
                    if (!$util.isInteger(message.num))
                        return "num: integer expected";
                return null;
            };

            return DiceInfo;
        })();

        return model_dice;
    })();

    dice.model_line = (function() {

        /**
         * Properties of a model_line.
         * @memberof dice
         * @interface Imodel_line
         * @property {Array.<dice.model_line.ILineModelInfo>|null} [info1] model_line info1
         * @property {Array.<dice.model_line.ILineModelInfo>|null} [info2] model_line info2
         * @property {Array.<dice.model_line.ILineModelInfo>|null} [info3] model_line info3
         * @property {number|null} [cur] model_line cur
         * @property {Array.<string>|null} [scene] model_line scene
         * @property {string|null} [sid] model_line sid
         */

        /**
         * Constructs a new model_line.
         * @memberof dice
         * @classdesc Represents a model_line.
         * @implements Imodel_line
         * @constructor
         * @param {dice.Imodel_line=} [properties] Properties to set
         */
        function model_line(properties) {
            this.info1 = [];
            this.info2 = [];
            this.info3 = [];
            this.scene = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * model_line info1.
         * @member {Array.<dice.model_line.ILineModelInfo>} info1
         * @memberof dice.model_line
         * @instance
         */
        model_line.prototype.info1 = $util.emptyArray;

        /**
         * model_line info2.
         * @member {Array.<dice.model_line.ILineModelInfo>} info2
         * @memberof dice.model_line
         * @instance
         */
        model_line.prototype.info2 = $util.emptyArray;

        /**
         * model_line info3.
         * @member {Array.<dice.model_line.ILineModelInfo>} info3
         * @memberof dice.model_line
         * @instance
         */
        model_line.prototype.info3 = $util.emptyArray;

        /**
         * model_line cur.
         * @member {number} cur
         * @memberof dice.model_line
         * @instance
         */
        model_line.prototype.cur = 0;

        /**
         * model_line scene.
         * @member {Array.<string>} scene
         * @memberof dice.model_line
         * @instance
         */
        model_line.prototype.scene = $util.emptyArray;

        /**
         * model_line sid.
         * @member {string} sid
         * @memberof dice.model_line
         * @instance
         */
        model_line.prototype.sid = "";

        /**
         * Creates a new model_line instance using the specified properties.
         * @function create
         * @memberof dice.model_line
         * @static
         * @param {dice.Imodel_line=} [properties] Properties to set
         * @returns {dice.model_line} model_line instance
         */
        model_line.create = function create(properties) {
            return new model_line(properties);
        };

        /**
         * Encodes the specified model_line message. Does not implicitly {@link dice.model_line.verify|verify} messages.
         * @function encode
         * @memberof dice.model_line
         * @static
         * @param {dice.Imodel_line} message model_line message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        model_line.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.info1 != null && message.info1.length)
                for (var i = 0; i < message.info1.length; ++i)
                    $root.dice.model_line.LineModelInfo.encode(message.info1[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.info2 != null && message.info2.length)
                for (var i = 0; i < message.info2.length; ++i)
                    $root.dice.model_line.LineModelInfo.encode(message.info2[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.info3 != null && message.info3.length)
                for (var i = 0; i < message.info3.length; ++i)
                    $root.dice.model_line.LineModelInfo.encode(message.info3[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.cur != null && message.hasOwnProperty("cur"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.cur);
            if (message.scene != null && message.scene.length)
                for (var i = 0; i < message.scene.length; ++i)
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.scene[i]);
            if (message.sid != null && message.hasOwnProperty("sid"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.sid);
            return writer;
        };

        /**
         * Encodes the specified model_line message, length delimited. Does not implicitly {@link dice.model_line.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.model_line
         * @static
         * @param {dice.Imodel_line} message model_line message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        model_line.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a model_line message from the specified reader or buffer.
         * @function decode
         * @memberof dice.model_line
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.model_line} model_line
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        model_line.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.model_line();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.info1 && message.info1.length))
                        message.info1 = [];
                    message.info1.push($root.dice.model_line.LineModelInfo.decode(reader, reader.uint32()));
                    break;
                case 2:
                    if (!(message.info2 && message.info2.length))
                        message.info2 = [];
                    message.info2.push($root.dice.model_line.LineModelInfo.decode(reader, reader.uint32()));
                    break;
                case 3:
                    if (!(message.info3 && message.info3.length))
                        message.info3 = [];
                    message.info3.push($root.dice.model_line.LineModelInfo.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.cur = reader.int32();
                    break;
                case 5:
                    if (!(message.scene && message.scene.length))
                        message.scene = [];
                    message.scene.push(reader.string());
                    break;
                case 6:
                    message.sid = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a model_line message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.model_line
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.model_line} model_line
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        model_line.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a model_line message.
         * @function verify
         * @memberof dice.model_line
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        model_line.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.info1 != null && message.hasOwnProperty("info1")) {
                if (!Array.isArray(message.info1))
                    return "info1: array expected";
                for (var i = 0; i < message.info1.length; ++i) {
                    var error = $root.dice.model_line.LineModelInfo.verify(message.info1[i]);
                    if (error)
                        return "info1." + error;
                }
            }
            if (message.info2 != null && message.hasOwnProperty("info2")) {
                if (!Array.isArray(message.info2))
                    return "info2: array expected";
                for (var i = 0; i < message.info2.length; ++i) {
                    var error = $root.dice.model_line.LineModelInfo.verify(message.info2[i]);
                    if (error)
                        return "info2." + error;
                }
            }
            if (message.info3 != null && message.hasOwnProperty("info3")) {
                if (!Array.isArray(message.info3))
                    return "info3: array expected";
                for (var i = 0; i < message.info3.length; ++i) {
                    var error = $root.dice.model_line.LineModelInfo.verify(message.info3[i]);
                    if (error)
                        return "info3." + error;
                }
            }
            if (message.cur != null && message.hasOwnProperty("cur"))
                if (!$util.isInteger(message.cur))
                    return "cur: integer expected";
            if (message.scene != null && message.hasOwnProperty("scene")) {
                if (!Array.isArray(message.scene))
                    return "scene: array expected";
                for (var i = 0; i < message.scene.length; ++i)
                    if (!$util.isString(message.scene[i]))
                        return "scene: string[] expected";
            }
            if (message.sid != null && message.hasOwnProperty("sid"))
                if (!$util.isString(message.sid))
                    return "sid: string expected";
            return null;
        };

        model_line.LineModelInfo = (function() {

            /**
             * Properties of a LineModelInfo.
             * @memberof dice.model_line
             * @interface ILineModelInfo
             * @property {string|null} [id] LineModelInfo id
             */

            /**
             * Constructs a new LineModelInfo.
             * @memberof dice.model_line
             * @classdesc Represents a LineModelInfo.
             * @implements ILineModelInfo
             * @constructor
             * @param {dice.model_line.ILineModelInfo=} [properties] Properties to set
             */
            function LineModelInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LineModelInfo id.
             * @member {string} id
             * @memberof dice.model_line.LineModelInfo
             * @instance
             */
            LineModelInfo.prototype.id = "";

            /**
             * Creates a new LineModelInfo instance using the specified properties.
             * @function create
             * @memberof dice.model_line.LineModelInfo
             * @static
             * @param {dice.model_line.ILineModelInfo=} [properties] Properties to set
             * @returns {dice.model_line.LineModelInfo} LineModelInfo instance
             */
            LineModelInfo.create = function create(properties) {
                return new LineModelInfo(properties);
            };

            /**
             * Encodes the specified LineModelInfo message. Does not implicitly {@link dice.model_line.LineModelInfo.verify|verify} messages.
             * @function encode
             * @memberof dice.model_line.LineModelInfo
             * @static
             * @param {dice.model_line.ILineModelInfo} message LineModelInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LineModelInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                return writer;
            };

            /**
             * Encodes the specified LineModelInfo message, length delimited. Does not implicitly {@link dice.model_line.LineModelInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dice.model_line.LineModelInfo
             * @static
             * @param {dice.model_line.ILineModelInfo} message LineModelInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LineModelInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a LineModelInfo message from the specified reader or buffer.
             * @function decode
             * @memberof dice.model_line.LineModelInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dice.model_line.LineModelInfo} LineModelInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LineModelInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.model_line.LineModelInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a LineModelInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dice.model_line.LineModelInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dice.model_line.LineModelInfo} LineModelInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LineModelInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a LineModelInfo message.
             * @function verify
             * @memberof dice.model_line.LineModelInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LineModelInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                return null;
            };

            return LineModelInfo;
        })();

        return model_line;
    })();

    dice.model_shop = (function() {

        /**
         * Properties of a model_shop.
         * @memberof dice
         * @interface Imodel_shop
         * @property {Object.<string,dice.model_shop.IDailyshop>|null} [dailyshop] model_shop dailyshop
         * @property {dice.model_shop.IGift|null} [gift] model_shop gift
         * @property {Object.<string,number>|null} [expression] model_shop expression
         * @property {number|null} [lastday] model_shop lastday
         */

        /**
         * Constructs a new model_shop.
         * @memberof dice
         * @classdesc Represents a model_shop.
         * @implements Imodel_shop
         * @constructor
         * @param {dice.Imodel_shop=} [properties] Properties to set
         */
        function model_shop(properties) {
            this.dailyshop = {};
            this.expression = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * model_shop dailyshop.
         * @member {Object.<string,dice.model_shop.IDailyshop>} dailyshop
         * @memberof dice.model_shop
         * @instance
         */
        model_shop.prototype.dailyshop = $util.emptyObject;

        /**
         * model_shop gift.
         * @member {dice.model_shop.IGift|null|undefined} gift
         * @memberof dice.model_shop
         * @instance
         */
        model_shop.prototype.gift = null;

        /**
         * model_shop expression.
         * @member {Object.<string,number>} expression
         * @memberof dice.model_shop
         * @instance
         */
        model_shop.prototype.expression = $util.emptyObject;

        /**
         * model_shop lastday.
         * @member {number} lastday
         * @memberof dice.model_shop
         * @instance
         */
        model_shop.prototype.lastday = 0;

        /**
         * Creates a new model_shop instance using the specified properties.
         * @function create
         * @memberof dice.model_shop
         * @static
         * @param {dice.Imodel_shop=} [properties] Properties to set
         * @returns {dice.model_shop} model_shop instance
         */
        model_shop.create = function create(properties) {
            return new model_shop(properties);
        };

        /**
         * Encodes the specified model_shop message. Does not implicitly {@link dice.model_shop.verify|verify} messages.
         * @function encode
         * @memberof dice.model_shop
         * @static
         * @param {dice.Imodel_shop} message model_shop message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        model_shop.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.dailyshop != null && message.hasOwnProperty("dailyshop"))
                for (var keys = Object.keys(message.dailyshop), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                    $root.dice.model_shop.Dailyshop.encode(message.dailyshop[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                }
            if (message.gift != null && message.hasOwnProperty("gift"))
                $root.dice.model_shop.Gift.encode(message.gift, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.expression != null && message.hasOwnProperty("expression"))
                for (var keys = Object.keys(message.expression), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 0 =*/16).int32(message.expression[keys[i]]).ldelim();
            if (message.lastday != null && message.hasOwnProperty("lastday"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.lastday);
            return writer;
        };

        /**
         * Encodes the specified model_shop message, length delimited. Does not implicitly {@link dice.model_shop.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.model_shop
         * @static
         * @param {dice.Imodel_shop} message model_shop message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        model_shop.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a model_shop message from the specified reader or buffer.
         * @function decode
         * @memberof dice.model_shop
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.model_shop} model_shop
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        model_shop.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.model_shop(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    reader.skip().pos++;
                    if (message.dailyshop === $util.emptyObject)
                        message.dailyshop = {};
                    key = reader.string();
                    reader.pos++;
                    message.dailyshop[key] = $root.dice.model_shop.Dailyshop.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.gift = $root.dice.model_shop.Gift.decode(reader, reader.uint32());
                    break;
                case 3:
                    reader.skip().pos++;
                    if (message.expression === $util.emptyObject)
                        message.expression = {};
                    key = reader.string();
                    reader.pos++;
                    message.expression[key] = reader.int32();
                    break;
                case 4:
                    message.lastday = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a model_shop message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.model_shop
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.model_shop} model_shop
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        model_shop.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a model_shop message.
         * @function verify
         * @memberof dice.model_shop
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        model_shop.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.dailyshop != null && message.hasOwnProperty("dailyshop")) {
                if (!$util.isObject(message.dailyshop))
                    return "dailyshop: object expected";
                var key = Object.keys(message.dailyshop);
                for (var i = 0; i < key.length; ++i) {
                    var error = $root.dice.model_shop.Dailyshop.verify(message.dailyshop[key[i]]);
                    if (error)
                        return "dailyshop." + error;
                }
            }
            if (message.gift != null && message.hasOwnProperty("gift")) {
                var error = $root.dice.model_shop.Gift.verify(message.gift);
                if (error)
                    return "gift." + error;
            }
            if (message.expression != null && message.hasOwnProperty("expression")) {
                if (!$util.isObject(message.expression))
                    return "expression: object expected";
                var key = Object.keys(message.expression);
                for (var i = 0; i < key.length; ++i)
                    if (!$util.isInteger(message.expression[key[i]]))
                        return "expression: integer{k:string} expected";
            }
            if (message.lastday != null && message.hasOwnProperty("lastday"))
                if (!$util.isInteger(message.lastday))
                    return "lastday: integer expected";
            return null;
        };

        model_shop.Dailyshop = (function() {

            /**
             * Properties of a Dailyshop.
             * @memberof dice.model_shop
             * @interface IDailyshop
             * @property {number|null} [id] Dailyshop id
             * @property {number|null} [num] Dailyshop num
             * @property {number|null} [hasBuy] Dailyshop hasBuy
             * @property {string|null} [diceId] Dailyshop diceId
             */

            /**
             * Constructs a new Dailyshop.
             * @memberof dice.model_shop
             * @classdesc Represents a Dailyshop.
             * @implements IDailyshop
             * @constructor
             * @param {dice.model_shop.IDailyshop=} [properties] Properties to set
             */
            function Dailyshop(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Dailyshop id.
             * @member {number} id
             * @memberof dice.model_shop.Dailyshop
             * @instance
             */
            Dailyshop.prototype.id = 0;

            /**
             * Dailyshop num.
             * @member {number} num
             * @memberof dice.model_shop.Dailyshop
             * @instance
             */
            Dailyshop.prototype.num = 0;

            /**
             * Dailyshop hasBuy.
             * @member {number} hasBuy
             * @memberof dice.model_shop.Dailyshop
             * @instance
             */
            Dailyshop.prototype.hasBuy = 0;

            /**
             * Dailyshop diceId.
             * @member {string} diceId
             * @memberof dice.model_shop.Dailyshop
             * @instance
             */
            Dailyshop.prototype.diceId = "";

            /**
             * Creates a new Dailyshop instance using the specified properties.
             * @function create
             * @memberof dice.model_shop.Dailyshop
             * @static
             * @param {dice.model_shop.IDailyshop=} [properties] Properties to set
             * @returns {dice.model_shop.Dailyshop} Dailyshop instance
             */
            Dailyshop.create = function create(properties) {
                return new Dailyshop(properties);
            };

            /**
             * Encodes the specified Dailyshop message. Does not implicitly {@link dice.model_shop.Dailyshop.verify|verify} messages.
             * @function encode
             * @memberof dice.model_shop.Dailyshop
             * @static
             * @param {dice.model_shop.IDailyshop} message Dailyshop message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Dailyshop.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                if (message.num != null && message.hasOwnProperty("num"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.num);
                if (message.hasBuy != null && message.hasOwnProperty("hasBuy"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.hasBuy);
                if (message.diceId != null && message.hasOwnProperty("diceId"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.diceId);
                return writer;
            };

            /**
             * Encodes the specified Dailyshop message, length delimited. Does not implicitly {@link dice.model_shop.Dailyshop.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dice.model_shop.Dailyshop
             * @static
             * @param {dice.model_shop.IDailyshop} message Dailyshop message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Dailyshop.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Dailyshop message from the specified reader or buffer.
             * @function decode
             * @memberof dice.model_shop.Dailyshop
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dice.model_shop.Dailyshop} Dailyshop
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Dailyshop.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.model_shop.Dailyshop();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.int32();
                        break;
                    case 2:
                        message.num = reader.int32();
                        break;
                    case 3:
                        message.hasBuy = reader.int32();
                        break;
                    case 4:
                        message.diceId = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Dailyshop message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dice.model_shop.Dailyshop
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dice.model_shop.Dailyshop} Dailyshop
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Dailyshop.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Dailyshop message.
             * @function verify
             * @memberof dice.model_shop.Dailyshop
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Dailyshop.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.num != null && message.hasOwnProperty("num"))
                    if (!$util.isInteger(message.num))
                        return "num: integer expected";
                if (message.hasBuy != null && message.hasOwnProperty("hasBuy"))
                    if (!$util.isInteger(message.hasBuy))
                        return "hasBuy: integer expected";
                if (message.diceId != null && message.hasOwnProperty("diceId"))
                    if (!$util.isString(message.diceId))
                        return "diceId: string expected";
                return null;
            };

            return Dailyshop;
        })();

        model_shop.Gift = (function() {

            /**
             * Properties of a Gift.
             * @memberof dice.model_shop
             * @interface IGift
             * @property {string|null} [id] Gift id
             * @property {number|null} [hasBuy] Gift hasBuy
             */

            /**
             * Constructs a new Gift.
             * @memberof dice.model_shop
             * @classdesc Represents a Gift.
             * @implements IGift
             * @constructor
             * @param {dice.model_shop.IGift=} [properties] Properties to set
             */
            function Gift(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Gift id.
             * @member {string} id
             * @memberof dice.model_shop.Gift
             * @instance
             */
            Gift.prototype.id = "";

            /**
             * Gift hasBuy.
             * @member {number} hasBuy
             * @memberof dice.model_shop.Gift
             * @instance
             */
            Gift.prototype.hasBuy = 0;

            /**
             * Creates a new Gift instance using the specified properties.
             * @function create
             * @memberof dice.model_shop.Gift
             * @static
             * @param {dice.model_shop.IGift=} [properties] Properties to set
             * @returns {dice.model_shop.Gift} Gift instance
             */
            Gift.create = function create(properties) {
                return new Gift(properties);
            };

            /**
             * Encodes the specified Gift message. Does not implicitly {@link dice.model_shop.Gift.verify|verify} messages.
             * @function encode
             * @memberof dice.model_shop.Gift
             * @static
             * @param {dice.model_shop.IGift} message Gift message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Gift.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.hasBuy != null && message.hasOwnProperty("hasBuy"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.hasBuy);
                return writer;
            };

            /**
             * Encodes the specified Gift message, length delimited. Does not implicitly {@link dice.model_shop.Gift.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dice.model_shop.Gift
             * @static
             * @param {dice.model_shop.IGift} message Gift message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Gift.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Gift message from the specified reader or buffer.
             * @function decode
             * @memberof dice.model_shop.Gift
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dice.model_shop.Gift} Gift
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Gift.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.model_shop.Gift();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.string();
                        break;
                    case 2:
                        message.hasBuy = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Gift message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dice.model_shop.Gift
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dice.model_shop.Gift} Gift
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Gift.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Gift message.
             * @function verify
             * @memberof dice.model_shop.Gift
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Gift.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.hasBuy != null && message.hasOwnProperty("hasBuy"))
                    if (!$util.isInteger(message.hasBuy))
                        return "hasBuy: integer expected";
                return null;
            };

            return Gift;
        })();

        return model_shop;
    })();

    dice.model_dailytask = (function() {

        /**
         * Properties of a model_dailytask.
         * @memberof dice
         * @interface Imodel_dailytask
         * @property {dice.model_dailytask.IDailyInfo|null} [info] model_dailytask info
         * @property {number|null} [lastday] model_dailytask lastday
         */

        /**
         * Constructs a new model_dailytask.
         * @memberof dice
         * @classdesc Represents a model_dailytask.
         * @implements Imodel_dailytask
         * @constructor
         * @param {dice.Imodel_dailytask=} [properties] Properties to set
         */
        function model_dailytask(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * model_dailytask info.
         * @member {dice.model_dailytask.IDailyInfo|null|undefined} info
         * @memberof dice.model_dailytask
         * @instance
         */
        model_dailytask.prototype.info = null;

        /**
         * model_dailytask lastday.
         * @member {number} lastday
         * @memberof dice.model_dailytask
         * @instance
         */
        model_dailytask.prototype.lastday = 0;

        /**
         * Creates a new model_dailytask instance using the specified properties.
         * @function create
         * @memberof dice.model_dailytask
         * @static
         * @param {dice.Imodel_dailytask=} [properties] Properties to set
         * @returns {dice.model_dailytask} model_dailytask instance
         */
        model_dailytask.create = function create(properties) {
            return new model_dailytask(properties);
        };

        /**
         * Encodes the specified model_dailytask message. Does not implicitly {@link dice.model_dailytask.verify|verify} messages.
         * @function encode
         * @memberof dice.model_dailytask
         * @static
         * @param {dice.Imodel_dailytask} message model_dailytask message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        model_dailytask.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.info != null && message.hasOwnProperty("info"))
                $root.dice.model_dailytask.DailyInfo.encode(message.info, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.lastday != null && message.hasOwnProperty("lastday"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.lastday);
            return writer;
        };

        /**
         * Encodes the specified model_dailytask message, length delimited. Does not implicitly {@link dice.model_dailytask.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.model_dailytask
         * @static
         * @param {dice.Imodel_dailytask} message model_dailytask message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        model_dailytask.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a model_dailytask message from the specified reader or buffer.
         * @function decode
         * @memberof dice.model_dailytask
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.model_dailytask} model_dailytask
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        model_dailytask.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.model_dailytask();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.info = $root.dice.model_dailytask.DailyInfo.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.lastday = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a model_dailytask message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.model_dailytask
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.model_dailytask} model_dailytask
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        model_dailytask.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a model_dailytask message.
         * @function verify
         * @memberof dice.model_dailytask
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        model_dailytask.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.info != null && message.hasOwnProperty("info")) {
                var error = $root.dice.model_dailytask.DailyInfo.verify(message.info);
                if (error)
                    return "info." + error;
            }
            if (message.lastday != null && message.hasOwnProperty("lastday"))
                if (!$util.isInteger(message.lastday))
                    return "lastday: integer expected";
            return null;
        };

        model_dailytask.DailyInfo = (function() {

            /**
             * Properties of a DailyInfo.
             * @memberof dice.model_dailytask
             * @interface IDailyInfo
             * @property {number|null} [freeGet1] DailyInfo freeGet1
             * @property {number|null} [freeGet2] DailyInfo freeGet2
             * @property {number|null} [freeGet3] DailyInfo freeGet3
             * @property {Array.<dice.model_dailytask.ITaskInfo>|null} [taskInfo] DailyInfo taskInfo
             * @property {number|null} [freshFlag] DailyInfo freshFlag
             */

            /**
             * Constructs a new DailyInfo.
             * @memberof dice.model_dailytask
             * @classdesc Represents a DailyInfo.
             * @implements IDailyInfo
             * @constructor
             * @param {dice.model_dailytask.IDailyInfo=} [properties] Properties to set
             */
            function DailyInfo(properties) {
                this.taskInfo = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DailyInfo freeGet1.
             * @member {number} freeGet1
             * @memberof dice.model_dailytask.DailyInfo
             * @instance
             */
            DailyInfo.prototype.freeGet1 = 0;

            /**
             * DailyInfo freeGet2.
             * @member {number} freeGet2
             * @memberof dice.model_dailytask.DailyInfo
             * @instance
             */
            DailyInfo.prototype.freeGet2 = 0;

            /**
             * DailyInfo freeGet3.
             * @member {number} freeGet3
             * @memberof dice.model_dailytask.DailyInfo
             * @instance
             */
            DailyInfo.prototype.freeGet3 = 0;

            /**
             * DailyInfo taskInfo.
             * @member {Array.<dice.model_dailytask.ITaskInfo>} taskInfo
             * @memberof dice.model_dailytask.DailyInfo
             * @instance
             */
            DailyInfo.prototype.taskInfo = $util.emptyArray;

            /**
             * DailyInfo freshFlag.
             * @member {number} freshFlag
             * @memberof dice.model_dailytask.DailyInfo
             * @instance
             */
            DailyInfo.prototype.freshFlag = 0;

            /**
             * Creates a new DailyInfo instance using the specified properties.
             * @function create
             * @memberof dice.model_dailytask.DailyInfo
             * @static
             * @param {dice.model_dailytask.IDailyInfo=} [properties] Properties to set
             * @returns {dice.model_dailytask.DailyInfo} DailyInfo instance
             */
            DailyInfo.create = function create(properties) {
                return new DailyInfo(properties);
            };

            /**
             * Encodes the specified DailyInfo message. Does not implicitly {@link dice.model_dailytask.DailyInfo.verify|verify} messages.
             * @function encode
             * @memberof dice.model_dailytask.DailyInfo
             * @static
             * @param {dice.model_dailytask.IDailyInfo} message DailyInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DailyInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.freeGet1 != null && message.hasOwnProperty("freeGet1"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.freeGet1);
                if (message.freeGet2 != null && message.hasOwnProperty("freeGet2"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.freeGet2);
                if (message.freeGet3 != null && message.hasOwnProperty("freeGet3"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.freeGet3);
                if (message.taskInfo != null && message.taskInfo.length)
                    for (var i = 0; i < message.taskInfo.length; ++i)
                        $root.dice.model_dailytask.TaskInfo.encode(message.taskInfo[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.freshFlag != null && message.hasOwnProperty("freshFlag"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.freshFlag);
                return writer;
            };

            /**
             * Encodes the specified DailyInfo message, length delimited. Does not implicitly {@link dice.model_dailytask.DailyInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dice.model_dailytask.DailyInfo
             * @static
             * @param {dice.model_dailytask.IDailyInfo} message DailyInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DailyInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DailyInfo message from the specified reader or buffer.
             * @function decode
             * @memberof dice.model_dailytask.DailyInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dice.model_dailytask.DailyInfo} DailyInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DailyInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.model_dailytask.DailyInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.freeGet1 = reader.int32();
                        break;
                    case 2:
                        message.freeGet2 = reader.int32();
                        break;
                    case 3:
                        message.freeGet3 = reader.int32();
                        break;
                    case 4:
                        if (!(message.taskInfo && message.taskInfo.length))
                            message.taskInfo = [];
                        message.taskInfo.push($root.dice.model_dailytask.TaskInfo.decode(reader, reader.uint32()));
                        break;
                    case 5:
                        message.freshFlag = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DailyInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dice.model_dailytask.DailyInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dice.model_dailytask.DailyInfo} DailyInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DailyInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DailyInfo message.
             * @function verify
             * @memberof dice.model_dailytask.DailyInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DailyInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.freeGet1 != null && message.hasOwnProperty("freeGet1"))
                    if (!$util.isInteger(message.freeGet1))
                        return "freeGet1: integer expected";
                if (message.freeGet2 != null && message.hasOwnProperty("freeGet2"))
                    if (!$util.isInteger(message.freeGet2))
                        return "freeGet2: integer expected";
                if (message.freeGet3 != null && message.hasOwnProperty("freeGet3"))
                    if (!$util.isInteger(message.freeGet3))
                        return "freeGet3: integer expected";
                if (message.taskInfo != null && message.hasOwnProperty("taskInfo")) {
                    if (!Array.isArray(message.taskInfo))
                        return "taskInfo: array expected";
                    for (var i = 0; i < message.taskInfo.length; ++i) {
                        var error = $root.dice.model_dailytask.TaskInfo.verify(message.taskInfo[i]);
                        if (error)
                            return "taskInfo." + error;
                    }
                }
                if (message.freshFlag != null && message.hasOwnProperty("freshFlag"))
                    if (!$util.isInteger(message.freshFlag))
                        return "freshFlag: integer expected";
                return null;
            };

            return DailyInfo;
        })();

        model_dailytask.TaskInfo = (function() {

            /**
             * Properties of a TaskInfo.
             * @memberof dice.model_dailytask
             * @interface ITaskInfo
             * @property {string|null} [id] TaskInfo id
             * @property {number|null} [v] TaskInfo v
             * @property {number|null} [f] TaskInfo f
             */

            /**
             * Constructs a new TaskInfo.
             * @memberof dice.model_dailytask
             * @classdesc Represents a TaskInfo.
             * @implements ITaskInfo
             * @constructor
             * @param {dice.model_dailytask.ITaskInfo=} [properties] Properties to set
             */
            function TaskInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TaskInfo id.
             * @member {string} id
             * @memberof dice.model_dailytask.TaskInfo
             * @instance
             */
            TaskInfo.prototype.id = "";

            /**
             * TaskInfo v.
             * @member {number} v
             * @memberof dice.model_dailytask.TaskInfo
             * @instance
             */
            TaskInfo.prototype.v = 0;

            /**
             * TaskInfo f.
             * @member {number} f
             * @memberof dice.model_dailytask.TaskInfo
             * @instance
             */
            TaskInfo.prototype.f = 0;

            /**
             * Creates a new TaskInfo instance using the specified properties.
             * @function create
             * @memberof dice.model_dailytask.TaskInfo
             * @static
             * @param {dice.model_dailytask.ITaskInfo=} [properties] Properties to set
             * @returns {dice.model_dailytask.TaskInfo} TaskInfo instance
             */
            TaskInfo.create = function create(properties) {
                return new TaskInfo(properties);
            };

            /**
             * Encodes the specified TaskInfo message. Does not implicitly {@link dice.model_dailytask.TaskInfo.verify|verify} messages.
             * @function encode
             * @memberof dice.model_dailytask.TaskInfo
             * @static
             * @param {dice.model_dailytask.ITaskInfo} message TaskInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TaskInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.v != null && message.hasOwnProperty("v"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.v);
                if (message.f != null && message.hasOwnProperty("f"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.f);
                return writer;
            };

            /**
             * Encodes the specified TaskInfo message, length delimited. Does not implicitly {@link dice.model_dailytask.TaskInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dice.model_dailytask.TaskInfo
             * @static
             * @param {dice.model_dailytask.ITaskInfo} message TaskInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TaskInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TaskInfo message from the specified reader or buffer.
             * @function decode
             * @memberof dice.model_dailytask.TaskInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dice.model_dailytask.TaskInfo} TaskInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TaskInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.model_dailytask.TaskInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.string();
                        break;
                    case 2:
                        message.v = reader.int32();
                        break;
                    case 3:
                        message.f = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TaskInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dice.model_dailytask.TaskInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dice.model_dailytask.TaskInfo} TaskInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TaskInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TaskInfo message.
             * @function verify
             * @memberof dice.model_dailytask.TaskInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TaskInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.v != null && message.hasOwnProperty("v"))
                    if (!$util.isInteger(message.v))
                        return "v: integer expected";
                if (message.f != null && message.hasOwnProperty("f"))
                    if (!$util.isInteger(message.f))
                        return "f: integer expected";
                return null;
            };

            return TaskInfo;
        })();

        return model_dailytask;
    })();

    dice.model_gameinfo = (function() {

        /**
         * Properties of a model_gameinfo.
         * @memberof dice
         * @interface Imodel_gameinfo
         * @property {number|null} [jvip] model_gameinfo jvip
         * @property {number|null} [svip] model_gameinfo svip
         * @property {Object.<string,dice.model_gameinfo.IRoyalPass>|null} [royalPass] model_gameinfo royalPass
         * @property {number|null} [jnum] model_gameinfo jnum
         * @property {number|null} [gnum] model_gameinfo gnum
         * @property {number|null} [buynum] model_gameinfo buynum
         * @property {number|null} [zengfu] model_gameinfo zengfu
         * @property {number|null} [newerGuild] model_gameinfo newerGuild
         * @property {Object.<string,number>|null} [stepGuild] model_gameinfo stepGuild
         * @property {number|null} [lastday] model_gameinfo lastday
         */

        /**
         * Constructs a new model_gameinfo.
         * @memberof dice
         * @classdesc Represents a model_gameinfo.
         * @implements Imodel_gameinfo
         * @constructor
         * @param {dice.Imodel_gameinfo=} [properties] Properties to set
         */
        function model_gameinfo(properties) {
            this.royalPass = {};
            this.stepGuild = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * model_gameinfo jvip.
         * @member {number} jvip
         * @memberof dice.model_gameinfo
         * @instance
         */
        model_gameinfo.prototype.jvip = 0;

        /**
         * model_gameinfo svip.
         * @member {number} svip
         * @memberof dice.model_gameinfo
         * @instance
         */
        model_gameinfo.prototype.svip = 0;

        /**
         * model_gameinfo royalPass.
         * @member {Object.<string,dice.model_gameinfo.IRoyalPass>} royalPass
         * @memberof dice.model_gameinfo
         * @instance
         */
        model_gameinfo.prototype.royalPass = $util.emptyObject;

        /**
         * model_gameinfo jnum.
         * @member {number} jnum
         * @memberof dice.model_gameinfo
         * @instance
         */
        model_gameinfo.prototype.jnum = 0;

        /**
         * model_gameinfo gnum.
         * @member {number} gnum
         * @memberof dice.model_gameinfo
         * @instance
         */
        model_gameinfo.prototype.gnum = 0;

        /**
         * model_gameinfo buynum.
         * @member {number} buynum
         * @memberof dice.model_gameinfo
         * @instance
         */
        model_gameinfo.prototype.buynum = 0;

        /**
         * model_gameinfo zengfu.
         * @member {number} zengfu
         * @memberof dice.model_gameinfo
         * @instance
         */
        model_gameinfo.prototype.zengfu = 0;

        /**
         * model_gameinfo newerGuild.
         * @member {number} newerGuild
         * @memberof dice.model_gameinfo
         * @instance
         */
        model_gameinfo.prototype.newerGuild = 0;

        /**
         * model_gameinfo stepGuild.
         * @member {Object.<string,number>} stepGuild
         * @memberof dice.model_gameinfo
         * @instance
         */
        model_gameinfo.prototype.stepGuild = $util.emptyObject;

        /**
         * model_gameinfo lastday.
         * @member {number} lastday
         * @memberof dice.model_gameinfo
         * @instance
         */
        model_gameinfo.prototype.lastday = 0;

        /**
         * Creates a new model_gameinfo instance using the specified properties.
         * @function create
         * @memberof dice.model_gameinfo
         * @static
         * @param {dice.Imodel_gameinfo=} [properties] Properties to set
         * @returns {dice.model_gameinfo} model_gameinfo instance
         */
        model_gameinfo.create = function create(properties) {
            return new model_gameinfo(properties);
        };

        /**
         * Encodes the specified model_gameinfo message. Does not implicitly {@link dice.model_gameinfo.verify|verify} messages.
         * @function encode
         * @memberof dice.model_gameinfo
         * @static
         * @param {dice.Imodel_gameinfo} message model_gameinfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        model_gameinfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.jvip != null && message.hasOwnProperty("jvip"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.jvip);
            if (message.svip != null && message.hasOwnProperty("svip"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.svip);
            if (message.royalPass != null && message.hasOwnProperty("royalPass"))
                for (var keys = Object.keys(message.royalPass), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                    $root.dice.model_gameinfo.RoyalPass.encode(message.royalPass[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                }
            if (message.jnum != null && message.hasOwnProperty("jnum"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.jnum);
            if (message.gnum != null && message.hasOwnProperty("gnum"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.gnum);
            if (message.buynum != null && message.hasOwnProperty("buynum"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.buynum);
            if (message.zengfu != null && message.hasOwnProperty("zengfu"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.zengfu);
            if (message.newerGuild != null && message.hasOwnProperty("newerGuild"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.newerGuild);
            if (message.stepGuild != null && message.hasOwnProperty("stepGuild"))
                for (var keys = Object.keys(message.stepGuild), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 9, wireType 2 =*/74).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 0 =*/16).int32(message.stepGuild[keys[i]]).ldelim();
            if (message.lastday != null && message.hasOwnProperty("lastday"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.lastday);
            return writer;
        };

        /**
         * Encodes the specified model_gameinfo message, length delimited. Does not implicitly {@link dice.model_gameinfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.model_gameinfo
         * @static
         * @param {dice.Imodel_gameinfo} message model_gameinfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        model_gameinfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a model_gameinfo message from the specified reader or buffer.
         * @function decode
         * @memberof dice.model_gameinfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.model_gameinfo} model_gameinfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        model_gameinfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.model_gameinfo(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.jvip = reader.int32();
                    break;
                case 2:
                    message.svip = reader.int32();
                    break;
                case 3:
                    reader.skip().pos++;
                    if (message.royalPass === $util.emptyObject)
                        message.royalPass = {};
                    key = reader.string();
                    reader.pos++;
                    message.royalPass[key] = $root.dice.model_gameinfo.RoyalPass.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.jnum = reader.int32();
                    break;
                case 5:
                    message.gnum = reader.int32();
                    break;
                case 6:
                    message.buynum = reader.int32();
                    break;
                case 7:
                    message.zengfu = reader.int32();
                    break;
                case 8:
                    message.newerGuild = reader.int32();
                    break;
                case 9:
                    reader.skip().pos++;
                    if (message.stepGuild === $util.emptyObject)
                        message.stepGuild = {};
                    key = reader.string();
                    reader.pos++;
                    message.stepGuild[key] = reader.int32();
                    break;
                case 10:
                    message.lastday = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a model_gameinfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.model_gameinfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.model_gameinfo} model_gameinfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        model_gameinfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a model_gameinfo message.
         * @function verify
         * @memberof dice.model_gameinfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        model_gameinfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.jvip != null && message.hasOwnProperty("jvip"))
                if (!$util.isInteger(message.jvip))
                    return "jvip: integer expected";
            if (message.svip != null && message.hasOwnProperty("svip"))
                if (!$util.isInteger(message.svip))
                    return "svip: integer expected";
            if (message.royalPass != null && message.hasOwnProperty("royalPass")) {
                if (!$util.isObject(message.royalPass))
                    return "royalPass: object expected";
                var key = Object.keys(message.royalPass);
                for (var i = 0; i < key.length; ++i) {
                    var error = $root.dice.model_gameinfo.RoyalPass.verify(message.royalPass[key[i]]);
                    if (error)
                        return "royalPass." + error;
                }
            }
            if (message.jnum != null && message.hasOwnProperty("jnum"))
                if (!$util.isInteger(message.jnum))
                    return "jnum: integer expected";
            if (message.gnum != null && message.hasOwnProperty("gnum"))
                if (!$util.isInteger(message.gnum))
                    return "gnum: integer expected";
            if (message.buynum != null && message.hasOwnProperty("buynum"))
                if (!$util.isInteger(message.buynum))
                    return "buynum: integer expected";
            if (message.zengfu != null && message.hasOwnProperty("zengfu"))
                if (!$util.isInteger(message.zengfu))
                    return "zengfu: integer expected";
            if (message.newerGuild != null && message.hasOwnProperty("newerGuild"))
                if (!$util.isInteger(message.newerGuild))
                    return "newerGuild: integer expected";
            if (message.stepGuild != null && message.hasOwnProperty("stepGuild")) {
                if (!$util.isObject(message.stepGuild))
                    return "stepGuild: object expected";
                var key = Object.keys(message.stepGuild);
                for (var i = 0; i < key.length; ++i)
                    if (!$util.isInteger(message.stepGuild[key[i]]))
                        return "stepGuild: integer{k:string} expected";
            }
            if (message.lastday != null && message.hasOwnProperty("lastday"))
                if (!$util.isInteger(message.lastday))
                    return "lastday: integer expected";
            return null;
        };

        model_gameinfo.RoyalPass = (function() {

            /**
             * Properties of a RoyalPass.
             * @memberof dice.model_gameinfo
             * @interface IRoyalPass
             * @property {number|null} [primary] RoyalPass primary
             * @property {number|null} [advanced] RoyalPass advanced
             */

            /**
             * Constructs a new RoyalPass.
             * @memberof dice.model_gameinfo
             * @classdesc Represents a RoyalPass.
             * @implements IRoyalPass
             * @constructor
             * @param {dice.model_gameinfo.IRoyalPass=} [properties] Properties to set
             */
            function RoyalPass(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RoyalPass primary.
             * @member {number} primary
             * @memberof dice.model_gameinfo.RoyalPass
             * @instance
             */
            RoyalPass.prototype.primary = 0;

            /**
             * RoyalPass advanced.
             * @member {number} advanced
             * @memberof dice.model_gameinfo.RoyalPass
             * @instance
             */
            RoyalPass.prototype.advanced = 0;

            /**
             * Creates a new RoyalPass instance using the specified properties.
             * @function create
             * @memberof dice.model_gameinfo.RoyalPass
             * @static
             * @param {dice.model_gameinfo.IRoyalPass=} [properties] Properties to set
             * @returns {dice.model_gameinfo.RoyalPass} RoyalPass instance
             */
            RoyalPass.create = function create(properties) {
                return new RoyalPass(properties);
            };

            /**
             * Encodes the specified RoyalPass message. Does not implicitly {@link dice.model_gameinfo.RoyalPass.verify|verify} messages.
             * @function encode
             * @memberof dice.model_gameinfo.RoyalPass
             * @static
             * @param {dice.model_gameinfo.IRoyalPass} message RoyalPass message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RoyalPass.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.primary != null && message.hasOwnProperty("primary"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.primary);
                if (message.advanced != null && message.hasOwnProperty("advanced"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.advanced);
                return writer;
            };

            /**
             * Encodes the specified RoyalPass message, length delimited. Does not implicitly {@link dice.model_gameinfo.RoyalPass.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dice.model_gameinfo.RoyalPass
             * @static
             * @param {dice.model_gameinfo.IRoyalPass} message RoyalPass message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RoyalPass.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RoyalPass message from the specified reader or buffer.
             * @function decode
             * @memberof dice.model_gameinfo.RoyalPass
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dice.model_gameinfo.RoyalPass} RoyalPass
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RoyalPass.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.model_gameinfo.RoyalPass();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.primary = reader.int32();
                        break;
                    case 2:
                        message.advanced = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a RoyalPass message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dice.model_gameinfo.RoyalPass
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dice.model_gameinfo.RoyalPass} RoyalPass
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RoyalPass.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RoyalPass message.
             * @function verify
             * @memberof dice.model_gameinfo.RoyalPass
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RoyalPass.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.primary != null && message.hasOwnProperty("primary"))
                    if (!$util.isInteger(message.primary))
                        return "primary: integer expected";
                if (message.advanced != null && message.hasOwnProperty("advanced"))
                    if (!$util.isInteger(message.advanced))
                        return "advanced: integer expected";
                return null;
            };

            return RoyalPass;
        })();

        return model_gameinfo;
    })();

    dice.model_mymail = (function() {

        /**
         * Properties of a model_mymail.
         * @memberof dice
         * @interface Imodel_mymail
         * @property {Object.<string,dice.model_mymail.ISystemData>|null} [system] model_mymail system
         * @property {number|Long|null} [checkts] model_mymail checkts
         */

        /**
         * Constructs a new model_mymail.
         * @memberof dice
         * @classdesc Represents a model_mymail.
         * @implements Imodel_mymail
         * @constructor
         * @param {dice.Imodel_mymail=} [properties] Properties to set
         */
        function model_mymail(properties) {
            this.system = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * model_mymail system.
         * @member {Object.<string,dice.model_mymail.ISystemData>} system
         * @memberof dice.model_mymail
         * @instance
         */
        model_mymail.prototype.system = $util.emptyObject;

        /**
         * model_mymail checkts.
         * @member {number|Long} checkts
         * @memberof dice.model_mymail
         * @instance
         */
        model_mymail.prototype.checkts = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new model_mymail instance using the specified properties.
         * @function create
         * @memberof dice.model_mymail
         * @static
         * @param {dice.Imodel_mymail=} [properties] Properties to set
         * @returns {dice.model_mymail} model_mymail instance
         */
        model_mymail.create = function create(properties) {
            return new model_mymail(properties);
        };

        /**
         * Encodes the specified model_mymail message. Does not implicitly {@link dice.model_mymail.verify|verify} messages.
         * @function encode
         * @memberof dice.model_mymail
         * @static
         * @param {dice.Imodel_mymail} message model_mymail message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        model_mymail.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.system != null && message.hasOwnProperty("system"))
                for (var keys = Object.keys(message.system), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                    $root.dice.model_mymail.SystemData.encode(message.system[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                }
            if (message.checkts != null && message.hasOwnProperty("checkts"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.checkts);
            return writer;
        };

        /**
         * Encodes the specified model_mymail message, length delimited. Does not implicitly {@link dice.model_mymail.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.model_mymail
         * @static
         * @param {dice.Imodel_mymail} message model_mymail message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        model_mymail.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a model_mymail message from the specified reader or buffer.
         * @function decode
         * @memberof dice.model_mymail
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.model_mymail} model_mymail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        model_mymail.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.model_mymail(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    reader.skip().pos++;
                    if (message.system === $util.emptyObject)
                        message.system = {};
                    key = reader.string();
                    reader.pos++;
                    message.system[key] = $root.dice.model_mymail.SystemData.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.checkts = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a model_mymail message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.model_mymail
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.model_mymail} model_mymail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        model_mymail.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a model_mymail message.
         * @function verify
         * @memberof dice.model_mymail
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        model_mymail.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.system != null && message.hasOwnProperty("system")) {
                if (!$util.isObject(message.system))
                    return "system: object expected";
                var key = Object.keys(message.system);
                for (var i = 0; i < key.length; ++i) {
                    var error = $root.dice.model_mymail.SystemData.verify(message.system[key[i]]);
                    if (error)
                        return "system." + error;
                }
            }
            if (message.checkts != null && message.hasOwnProperty("checkts"))
                if (!$util.isInteger(message.checkts) && !(message.checkts && $util.isInteger(message.checkts.low) && $util.isInteger(message.checkts.high)))
                    return "checkts: integer|Long expected";
            return null;
        };

        model_mymail.SystemData = (function() {

            /**
             * Properties of a SystemData.
             * @memberof dice.model_mymail
             * @interface ISystemData
             * @property {number|null} [id] SystemData id
             * @property {string|null} [title] SystemData title
             * @property {string|null} [content] SystemData content
             * @property {number|null} [ts] SystemData ts
             * @property {string|null} [rewards] SystemData rewards
             * @property {number|null} [isread] SystemData isread
             */

            /**
             * Constructs a new SystemData.
             * @memberof dice.model_mymail
             * @classdesc Represents a SystemData.
             * @implements ISystemData
             * @constructor
             * @param {dice.model_mymail.ISystemData=} [properties] Properties to set
             */
            function SystemData(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SystemData id.
             * @member {number} id
             * @memberof dice.model_mymail.SystemData
             * @instance
             */
            SystemData.prototype.id = 0;

            /**
             * SystemData title.
             * @member {string} title
             * @memberof dice.model_mymail.SystemData
             * @instance
             */
            SystemData.prototype.title = "";

            /**
             * SystemData content.
             * @member {string} content
             * @memberof dice.model_mymail.SystemData
             * @instance
             */
            SystemData.prototype.content = "";

            /**
             * SystemData ts.
             * @member {number} ts
             * @memberof dice.model_mymail.SystemData
             * @instance
             */
            SystemData.prototype.ts = 0;

            /**
             * SystemData rewards.
             * @member {string} rewards
             * @memberof dice.model_mymail.SystemData
             * @instance
             */
            SystemData.prototype.rewards = "";

            /**
             * SystemData isread.
             * @member {number} isread
             * @memberof dice.model_mymail.SystemData
             * @instance
             */
            SystemData.prototype.isread = 0;

            /**
             * Creates a new SystemData instance using the specified properties.
             * @function create
             * @memberof dice.model_mymail.SystemData
             * @static
             * @param {dice.model_mymail.ISystemData=} [properties] Properties to set
             * @returns {dice.model_mymail.SystemData} SystemData instance
             */
            SystemData.create = function create(properties) {
                return new SystemData(properties);
            };

            /**
             * Encodes the specified SystemData message. Does not implicitly {@link dice.model_mymail.SystemData.verify|verify} messages.
             * @function encode
             * @memberof dice.model_mymail.SystemData
             * @static
             * @param {dice.model_mymail.ISystemData} message SystemData message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SystemData.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                if (message.title != null && message.hasOwnProperty("title"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.title);
                if (message.content != null && message.hasOwnProperty("content"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.content);
                if (message.ts != null && message.hasOwnProperty("ts"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.ts);
                if (message.rewards != null && message.hasOwnProperty("rewards"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.rewards);
                if (message.isread != null && message.hasOwnProperty("isread"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.isread);
                return writer;
            };

            /**
             * Encodes the specified SystemData message, length delimited. Does not implicitly {@link dice.model_mymail.SystemData.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dice.model_mymail.SystemData
             * @static
             * @param {dice.model_mymail.ISystemData} message SystemData message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SystemData.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SystemData message from the specified reader or buffer.
             * @function decode
             * @memberof dice.model_mymail.SystemData
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dice.model_mymail.SystemData} SystemData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SystemData.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.model_mymail.SystemData();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.int32();
                        break;
                    case 2:
                        message.title = reader.string();
                        break;
                    case 3:
                        message.content = reader.string();
                        break;
                    case 4:
                        message.ts = reader.int32();
                        break;
                    case 5:
                        message.rewards = reader.string();
                        break;
                    case 6:
                        message.isread = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a SystemData message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dice.model_mymail.SystemData
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dice.model_mymail.SystemData} SystemData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SystemData.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SystemData message.
             * @function verify
             * @memberof dice.model_mymail.SystemData
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SystemData.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.title != null && message.hasOwnProperty("title"))
                    if (!$util.isString(message.title))
                        return "title: string expected";
                if (message.content != null && message.hasOwnProperty("content"))
                    if (!$util.isString(message.content))
                        return "content: string expected";
                if (message.ts != null && message.hasOwnProperty("ts"))
                    if (!$util.isInteger(message.ts))
                        return "ts: integer expected";
                if (message.rewards != null && message.hasOwnProperty("rewards"))
                    if (!$util.isString(message.rewards))
                        return "rewards: string expected";
                if (message.isread != null && message.hasOwnProperty("isread"))
                    if (!$util.isInteger(message.isread))
                        return "isread: integer expected";
                return null;
            };

            return SystemData;
        })();

        return model_mymail;
    })();

    dice.model_battlelog = (function() {

        /**
         * Properties of a model_battlelog.
         * @memberof dice
         * @interface Imodel_battlelog
         * @property {Array.<dice.model_battlelog.IBattleLogInfo>|null} [info] model_battlelog info
         */

        /**
         * Constructs a new model_battlelog.
         * @memberof dice
         * @classdesc Represents a model_battlelog.
         * @implements Imodel_battlelog
         * @constructor
         * @param {dice.Imodel_battlelog=} [properties] Properties to set
         */
        function model_battlelog(properties) {
            this.info = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * model_battlelog info.
         * @member {Array.<dice.model_battlelog.IBattleLogInfo>} info
         * @memberof dice.model_battlelog
         * @instance
         */
        model_battlelog.prototype.info = $util.emptyArray;

        /**
         * Creates a new model_battlelog instance using the specified properties.
         * @function create
         * @memberof dice.model_battlelog
         * @static
         * @param {dice.Imodel_battlelog=} [properties] Properties to set
         * @returns {dice.model_battlelog} model_battlelog instance
         */
        model_battlelog.create = function create(properties) {
            return new model_battlelog(properties);
        };

        /**
         * Encodes the specified model_battlelog message. Does not implicitly {@link dice.model_battlelog.verify|verify} messages.
         * @function encode
         * @memberof dice.model_battlelog
         * @static
         * @param {dice.Imodel_battlelog} message model_battlelog message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        model_battlelog.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.info != null && message.info.length)
                for (var i = 0; i < message.info.length; ++i)
                    $root.dice.model_battlelog.BattleLogInfo.encode(message.info[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified model_battlelog message, length delimited. Does not implicitly {@link dice.model_battlelog.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.model_battlelog
         * @static
         * @param {dice.Imodel_battlelog} message model_battlelog message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        model_battlelog.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a model_battlelog message from the specified reader or buffer.
         * @function decode
         * @memberof dice.model_battlelog
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.model_battlelog} model_battlelog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        model_battlelog.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.model_battlelog();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.info && message.info.length))
                        message.info = [];
                    message.info.push($root.dice.model_battlelog.BattleLogInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a model_battlelog message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.model_battlelog
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.model_battlelog} model_battlelog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        model_battlelog.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a model_battlelog message.
         * @function verify
         * @memberof dice.model_battlelog
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        model_battlelog.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.info != null && message.hasOwnProperty("info")) {
                if (!Array.isArray(message.info))
                    return "info: array expected";
                for (var i = 0; i < message.info.length; ++i) {
                    var error = $root.dice.model_battlelog.BattleLogInfo.verify(message.info[i]);
                    if (error)
                        return "info." + error;
                }
            }
            return null;
        };

        model_battlelog.BattleLogInfo = (function() {

            /**
             * Properties of a BattleLogInfo.
             * @memberof dice.model_battlelog
             * @interface IBattleLogInfo
             * @property {number|null} [battleType] BattleLogInfo battleType
             * @property {number|null} [changeScore] BattleLogInfo changeScore
             * @property {number|null} [turns] BattleLogInfo turns
             * @property {number|null} [winFlag] BattleLogInfo winFlag
             * @property {number|null} [uid] BattleLogInfo uid
             * @property {number|null} [level] BattleLogInfo level
             * @property {string|null} [name] BattleLogInfo name
             * @property {number|null} [score] BattleLogInfo score
             * @property {number|null} [complain] BattleLogInfo complain
             * @property {Array.<dice.model_battlelog.BattleLogInfo.IlineInfo>|null} [line] BattleLogInfo line
             */

            /**
             * Constructs a new BattleLogInfo.
             * @memberof dice.model_battlelog
             * @classdesc Represents a BattleLogInfo.
             * @implements IBattleLogInfo
             * @constructor
             * @param {dice.model_battlelog.IBattleLogInfo=} [properties] Properties to set
             */
            function BattleLogInfo(properties) {
                this.line = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * BattleLogInfo battleType.
             * @member {number} battleType
             * @memberof dice.model_battlelog.BattleLogInfo
             * @instance
             */
            BattleLogInfo.prototype.battleType = 0;

            /**
             * BattleLogInfo changeScore.
             * @member {number} changeScore
             * @memberof dice.model_battlelog.BattleLogInfo
             * @instance
             */
            BattleLogInfo.prototype.changeScore = 0;

            /**
             * BattleLogInfo turns.
             * @member {number} turns
             * @memberof dice.model_battlelog.BattleLogInfo
             * @instance
             */
            BattleLogInfo.prototype.turns = 0;

            /**
             * BattleLogInfo winFlag.
             * @member {number} winFlag
             * @memberof dice.model_battlelog.BattleLogInfo
             * @instance
             */
            BattleLogInfo.prototype.winFlag = 0;

            /**
             * BattleLogInfo uid.
             * @member {number} uid
             * @memberof dice.model_battlelog.BattleLogInfo
             * @instance
             */
            BattleLogInfo.prototype.uid = 0;

            /**
             * BattleLogInfo level.
             * @member {number} level
             * @memberof dice.model_battlelog.BattleLogInfo
             * @instance
             */
            BattleLogInfo.prototype.level = 0;

            /**
             * BattleLogInfo name.
             * @member {string} name
             * @memberof dice.model_battlelog.BattleLogInfo
             * @instance
             */
            BattleLogInfo.prototype.name = "";

            /**
             * BattleLogInfo score.
             * @member {number} score
             * @memberof dice.model_battlelog.BattleLogInfo
             * @instance
             */
            BattleLogInfo.prototype.score = 0;

            /**
             * BattleLogInfo complain.
             * @member {number} complain
             * @memberof dice.model_battlelog.BattleLogInfo
             * @instance
             */
            BattleLogInfo.prototype.complain = 0;

            /**
             * BattleLogInfo line.
             * @member {Array.<dice.model_battlelog.BattleLogInfo.IlineInfo>} line
             * @memberof dice.model_battlelog.BattleLogInfo
             * @instance
             */
            BattleLogInfo.prototype.line = $util.emptyArray;

            /**
             * Creates a new BattleLogInfo instance using the specified properties.
             * @function create
             * @memberof dice.model_battlelog.BattleLogInfo
             * @static
             * @param {dice.model_battlelog.IBattleLogInfo=} [properties] Properties to set
             * @returns {dice.model_battlelog.BattleLogInfo} BattleLogInfo instance
             */
            BattleLogInfo.create = function create(properties) {
                return new BattleLogInfo(properties);
            };

            /**
             * Encodes the specified BattleLogInfo message. Does not implicitly {@link dice.model_battlelog.BattleLogInfo.verify|verify} messages.
             * @function encode
             * @memberof dice.model_battlelog.BattleLogInfo
             * @static
             * @param {dice.model_battlelog.IBattleLogInfo} message BattleLogInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BattleLogInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.battleType != null && message.hasOwnProperty("battleType"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.battleType);
                if (message.changeScore != null && message.hasOwnProperty("changeScore"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.changeScore);
                if (message.turns != null && message.hasOwnProperty("turns"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.turns);
                if (message.winFlag != null && message.hasOwnProperty("winFlag"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.winFlag);
                if (message.uid != null && message.hasOwnProperty("uid"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.uid);
                if (message.level != null && message.hasOwnProperty("level"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.level);
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 7, wireType 2 =*/58).string(message.name);
                if (message.score != null && message.hasOwnProperty("score"))
                    writer.uint32(/* id 8, wireType 0 =*/64).int32(message.score);
                if (message.complain != null && message.hasOwnProperty("complain"))
                    writer.uint32(/* id 9, wireType 0 =*/72).int32(message.complain);
                if (message.line != null && message.line.length)
                    for (var i = 0; i < message.line.length; ++i)
                        $root.dice.model_battlelog.BattleLogInfo.lineInfo.encode(message.line[i], writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified BattleLogInfo message, length delimited. Does not implicitly {@link dice.model_battlelog.BattleLogInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dice.model_battlelog.BattleLogInfo
             * @static
             * @param {dice.model_battlelog.IBattleLogInfo} message BattleLogInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BattleLogInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a BattleLogInfo message from the specified reader or buffer.
             * @function decode
             * @memberof dice.model_battlelog.BattleLogInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dice.model_battlelog.BattleLogInfo} BattleLogInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BattleLogInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.model_battlelog.BattleLogInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.battleType = reader.int32();
                        break;
                    case 2:
                        message.changeScore = reader.int32();
                        break;
                    case 3:
                        message.turns = reader.int32();
                        break;
                    case 4:
                        message.winFlag = reader.int32();
                        break;
                    case 5:
                        message.uid = reader.int32();
                        break;
                    case 6:
                        message.level = reader.int32();
                        break;
                    case 7:
                        message.name = reader.string();
                        break;
                    case 8:
                        message.score = reader.int32();
                        break;
                    case 9:
                        message.complain = reader.int32();
                        break;
                    case 10:
                        if (!(message.line && message.line.length))
                            message.line = [];
                        message.line.push($root.dice.model_battlelog.BattleLogInfo.lineInfo.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a BattleLogInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dice.model_battlelog.BattleLogInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dice.model_battlelog.BattleLogInfo} BattleLogInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BattleLogInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a BattleLogInfo message.
             * @function verify
             * @memberof dice.model_battlelog.BattleLogInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BattleLogInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.battleType != null && message.hasOwnProperty("battleType"))
                    if (!$util.isInteger(message.battleType))
                        return "battleType: integer expected";
                if (message.changeScore != null && message.hasOwnProperty("changeScore"))
                    if (!$util.isInteger(message.changeScore))
                        return "changeScore: integer expected";
                if (message.turns != null && message.hasOwnProperty("turns"))
                    if (!$util.isInteger(message.turns))
                        return "turns: integer expected";
                if (message.winFlag != null && message.hasOwnProperty("winFlag"))
                    if (!$util.isInteger(message.winFlag))
                        return "winFlag: integer expected";
                if (message.uid != null && message.hasOwnProperty("uid"))
                    if (!$util.isInteger(message.uid))
                        return "uid: integer expected";
                if (message.level != null && message.hasOwnProperty("level"))
                    if (!$util.isInteger(message.level))
                        return "level: integer expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.score != null && message.hasOwnProperty("score"))
                    if (!$util.isInteger(message.score))
                        return "score: integer expected";
                if (message.complain != null && message.hasOwnProperty("complain"))
                    if (!$util.isInteger(message.complain))
                        return "complain: integer expected";
                if (message.line != null && message.hasOwnProperty("line")) {
                    if (!Array.isArray(message.line))
                        return "line: array expected";
                    for (var i = 0; i < message.line.length; ++i) {
                        var error = $root.dice.model_battlelog.BattleLogInfo.lineInfo.verify(message.line[i]);
                        if (error)
                            return "line." + error;
                    }
                }
                return null;
            };

            BattleLogInfo.lineInfo = (function() {

                /**
                 * Properties of a lineInfo.
                 * @memberof dice.model_battlelog.BattleLogInfo
                 * @interface IlineInfo
                 * @property {string|null} [id] lineInfo id
                 */

                /**
                 * Constructs a new lineInfo.
                 * @memberof dice.model_battlelog.BattleLogInfo
                 * @classdesc Represents a lineInfo.
                 * @implements IlineInfo
                 * @constructor
                 * @param {dice.model_battlelog.BattleLogInfo.IlineInfo=} [properties] Properties to set
                 */
                function lineInfo(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * lineInfo id.
                 * @member {string} id
                 * @memberof dice.model_battlelog.BattleLogInfo.lineInfo
                 * @instance
                 */
                lineInfo.prototype.id = "";

                /**
                 * Creates a new lineInfo instance using the specified properties.
                 * @function create
                 * @memberof dice.model_battlelog.BattleLogInfo.lineInfo
                 * @static
                 * @param {dice.model_battlelog.BattleLogInfo.IlineInfo=} [properties] Properties to set
                 * @returns {dice.model_battlelog.BattleLogInfo.lineInfo} lineInfo instance
                 */
                lineInfo.create = function create(properties) {
                    return new lineInfo(properties);
                };

                /**
                 * Encodes the specified lineInfo message. Does not implicitly {@link dice.model_battlelog.BattleLogInfo.lineInfo.verify|verify} messages.
                 * @function encode
                 * @memberof dice.model_battlelog.BattleLogInfo.lineInfo
                 * @static
                 * @param {dice.model_battlelog.BattleLogInfo.IlineInfo} message lineInfo message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                lineInfo.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && message.hasOwnProperty("id"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                    return writer;
                };

                /**
                 * Encodes the specified lineInfo message, length delimited. Does not implicitly {@link dice.model_battlelog.BattleLogInfo.lineInfo.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof dice.model_battlelog.BattleLogInfo.lineInfo
                 * @static
                 * @param {dice.model_battlelog.BattleLogInfo.IlineInfo} message lineInfo message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                lineInfo.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a lineInfo message from the specified reader or buffer.
                 * @function decode
                 * @memberof dice.model_battlelog.BattleLogInfo.lineInfo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {dice.model_battlelog.BattleLogInfo.lineInfo} lineInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                lineInfo.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.model_battlelog.BattleLogInfo.lineInfo();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.id = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a lineInfo message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof dice.model_battlelog.BattleLogInfo.lineInfo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {dice.model_battlelog.BattleLogInfo.lineInfo} lineInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                lineInfo.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a lineInfo message.
                 * @function verify
                 * @memberof dice.model_battlelog.BattleLogInfo.lineInfo
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                lineInfo.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isString(message.id))
                            return "id: string expected";
                    return null;
                };

                return lineInfo;
            })();

            return BattleLogInfo;
        })();

        return model_battlelog;
    })();

    dice.model_advertise = (function() {

        /**
         * Properties of a model_advertise.
         * @memberof dice
         * @interface Imodel_advertise
         * @property {Object.<string,dice.model_advertise.IadvInfo>|null} [info] model_advertise info
         * @property {number|null} [lastday] model_advertise lastday
         */

        /**
         * Constructs a new model_advertise.
         * @memberof dice
         * @classdesc Represents a model_advertise.
         * @implements Imodel_advertise
         * @constructor
         * @param {dice.Imodel_advertise=} [properties] Properties to set
         */
        function model_advertise(properties) {
            this.info = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * model_advertise info.
         * @member {Object.<string,dice.model_advertise.IadvInfo>} info
         * @memberof dice.model_advertise
         * @instance
         */
        model_advertise.prototype.info = $util.emptyObject;

        /**
         * model_advertise lastday.
         * @member {number} lastday
         * @memberof dice.model_advertise
         * @instance
         */
        model_advertise.prototype.lastday = 0;

        /**
         * Creates a new model_advertise instance using the specified properties.
         * @function create
         * @memberof dice.model_advertise
         * @static
         * @param {dice.Imodel_advertise=} [properties] Properties to set
         * @returns {dice.model_advertise} model_advertise instance
         */
        model_advertise.create = function create(properties) {
            return new model_advertise(properties);
        };

        /**
         * Encodes the specified model_advertise message. Does not implicitly {@link dice.model_advertise.verify|verify} messages.
         * @function encode
         * @memberof dice.model_advertise
         * @static
         * @param {dice.Imodel_advertise} message model_advertise message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        model_advertise.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.info != null && message.hasOwnProperty("info"))
                for (var keys = Object.keys(message.info), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                    $root.dice.model_advertise.advInfo.encode(message.info[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                }
            if (message.lastday != null && message.hasOwnProperty("lastday"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.lastday);
            return writer;
        };

        /**
         * Encodes the specified model_advertise message, length delimited. Does not implicitly {@link dice.model_advertise.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.model_advertise
         * @static
         * @param {dice.Imodel_advertise} message model_advertise message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        model_advertise.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a model_advertise message from the specified reader or buffer.
         * @function decode
         * @memberof dice.model_advertise
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.model_advertise} model_advertise
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        model_advertise.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.model_advertise(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    reader.skip().pos++;
                    if (message.info === $util.emptyObject)
                        message.info = {};
                    key = reader.string();
                    reader.pos++;
                    message.info[key] = $root.dice.model_advertise.advInfo.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.lastday = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a model_advertise message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.model_advertise
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.model_advertise} model_advertise
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        model_advertise.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a model_advertise message.
         * @function verify
         * @memberof dice.model_advertise
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        model_advertise.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.info != null && message.hasOwnProperty("info")) {
                if (!$util.isObject(message.info))
                    return "info: object expected";
                var key = Object.keys(message.info);
                for (var i = 0; i < key.length; ++i) {
                    var error = $root.dice.model_advertise.advInfo.verify(message.info[key[i]]);
                    if (error)
                        return "info." + error;
                }
            }
            if (message.lastday != null && message.hasOwnProperty("lastday"))
                if (!$util.isInteger(message.lastday))
                    return "lastday: integer expected";
            return null;
        };

        model_advertise.advInfo = (function() {

            /**
             * Properties of an advInfo.
             * @memberof dice.model_advertise
             * @interface IadvInfo
             * @property {number|null} [st] advInfo st
             * @property {number|null} [num] advInfo num
             */

            /**
             * Constructs a new advInfo.
             * @memberof dice.model_advertise
             * @classdesc Represents an advInfo.
             * @implements IadvInfo
             * @constructor
             * @param {dice.model_advertise.IadvInfo=} [properties] Properties to set
             */
            function advInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * advInfo st.
             * @member {number} st
             * @memberof dice.model_advertise.advInfo
             * @instance
             */
            advInfo.prototype.st = 0;

            /**
             * advInfo num.
             * @member {number} num
             * @memberof dice.model_advertise.advInfo
             * @instance
             */
            advInfo.prototype.num = 0;

            /**
             * Creates a new advInfo instance using the specified properties.
             * @function create
             * @memberof dice.model_advertise.advInfo
             * @static
             * @param {dice.model_advertise.IadvInfo=} [properties] Properties to set
             * @returns {dice.model_advertise.advInfo} advInfo instance
             */
            advInfo.create = function create(properties) {
                return new advInfo(properties);
            };

            /**
             * Encodes the specified advInfo message. Does not implicitly {@link dice.model_advertise.advInfo.verify|verify} messages.
             * @function encode
             * @memberof dice.model_advertise.advInfo
             * @static
             * @param {dice.model_advertise.IadvInfo} message advInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            advInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.st != null && message.hasOwnProperty("st"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.st);
                if (message.num != null && message.hasOwnProperty("num"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.num);
                return writer;
            };

            /**
             * Encodes the specified advInfo message, length delimited. Does not implicitly {@link dice.model_advertise.advInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dice.model_advertise.advInfo
             * @static
             * @param {dice.model_advertise.IadvInfo} message advInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            advInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an advInfo message from the specified reader or buffer.
             * @function decode
             * @memberof dice.model_advertise.advInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dice.model_advertise.advInfo} advInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            advInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.model_advertise.advInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.st = reader.int32();
                        break;
                    case 2:
                        message.num = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an advInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dice.model_advertise.advInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dice.model_advertise.advInfo} advInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            advInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an advInfo message.
             * @function verify
             * @memberof dice.model_advertise.advInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            advInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.st != null && message.hasOwnProperty("st"))
                    if (!$util.isInteger(message.st))
                        return "st: integer expected";
                if (message.num != null && message.hasOwnProperty("num"))
                    if (!$util.isInteger(message.num))
                        return "num: integer expected";
                return null;
            };

            return advInfo;
        })();

        return model_advertise;
    })();

    dice.model_fairArena = (function() {

        /**
         * Properties of a model_fairArena.
         * @memberof dice
         * @interface Imodel_fairArena
         * @property {number|null} [status] model_fairArena status
         * @property {number|null} [winNum] model_fairArena winNum
         * @property {number|null} [loseNum] model_fairArena loseNum
         * @property {Array.<dice.model_fairArena.IlineInfo>|null} [line] model_fairArena line
         * @property {Object.<string,dice.model_fairArena.IPoolInfo>|null} [pool] model_fairArena pool
         * @property {Object.<string,number>|null} [rewards] model_fairArena rewards
         */

        /**
         * Constructs a new model_fairArena.
         * @memberof dice
         * @classdesc Represents a model_fairArena.
         * @implements Imodel_fairArena
         * @constructor
         * @param {dice.Imodel_fairArena=} [properties] Properties to set
         */
        function model_fairArena(properties) {
            this.line = [];
            this.pool = {};
            this.rewards = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * model_fairArena status.
         * @member {number} status
         * @memberof dice.model_fairArena
         * @instance
         */
        model_fairArena.prototype.status = 0;

        /**
         * model_fairArena winNum.
         * @member {number} winNum
         * @memberof dice.model_fairArena
         * @instance
         */
        model_fairArena.prototype.winNum = 0;

        /**
         * model_fairArena loseNum.
         * @member {number} loseNum
         * @memberof dice.model_fairArena
         * @instance
         */
        model_fairArena.prototype.loseNum = 0;

        /**
         * model_fairArena line.
         * @member {Array.<dice.model_fairArena.IlineInfo>} line
         * @memberof dice.model_fairArena
         * @instance
         */
        model_fairArena.prototype.line = $util.emptyArray;

        /**
         * model_fairArena pool.
         * @member {Object.<string,dice.model_fairArena.IPoolInfo>} pool
         * @memberof dice.model_fairArena
         * @instance
         */
        model_fairArena.prototype.pool = $util.emptyObject;

        /**
         * model_fairArena rewards.
         * @member {Object.<string,number>} rewards
         * @memberof dice.model_fairArena
         * @instance
         */
        model_fairArena.prototype.rewards = $util.emptyObject;

        /**
         * Creates a new model_fairArena instance using the specified properties.
         * @function create
         * @memberof dice.model_fairArena
         * @static
         * @param {dice.Imodel_fairArena=} [properties] Properties to set
         * @returns {dice.model_fairArena} model_fairArena instance
         */
        model_fairArena.create = function create(properties) {
            return new model_fairArena(properties);
        };

        /**
         * Encodes the specified model_fairArena message. Does not implicitly {@link dice.model_fairArena.verify|verify} messages.
         * @function encode
         * @memberof dice.model_fairArena
         * @static
         * @param {dice.Imodel_fairArena} message model_fairArena message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        model_fairArena.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.status != null && message.hasOwnProperty("status"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.status);
            if (message.winNum != null && message.hasOwnProperty("winNum"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.winNum);
            if (message.loseNum != null && message.hasOwnProperty("loseNum"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.loseNum);
            if (message.line != null && message.line.length)
                for (var i = 0; i < message.line.length; ++i)
                    $root.dice.model_fairArena.lineInfo.encode(message.line[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.pool != null && message.hasOwnProperty("pool"))
                for (var keys = Object.keys(message.pool), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 5, wireType 2 =*/42).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                    $root.dice.model_fairArena.PoolInfo.encode(message.pool[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                }
            if (message.rewards != null && message.hasOwnProperty("rewards"))
                for (var keys = Object.keys(message.rewards), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 6, wireType 2 =*/50).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 0 =*/16).int32(message.rewards[keys[i]]).ldelim();
            return writer;
        };

        /**
         * Encodes the specified model_fairArena message, length delimited. Does not implicitly {@link dice.model_fairArena.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.model_fairArena
         * @static
         * @param {dice.Imodel_fairArena} message model_fairArena message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        model_fairArena.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a model_fairArena message from the specified reader or buffer.
         * @function decode
         * @memberof dice.model_fairArena
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.model_fairArena} model_fairArena
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        model_fairArena.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.model_fairArena(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.status = reader.int32();
                    break;
                case 2:
                    message.winNum = reader.int32();
                    break;
                case 3:
                    message.loseNum = reader.int32();
                    break;
                case 4:
                    if (!(message.line && message.line.length))
                        message.line = [];
                    message.line.push($root.dice.model_fairArena.lineInfo.decode(reader, reader.uint32()));
                    break;
                case 5:
                    reader.skip().pos++;
                    if (message.pool === $util.emptyObject)
                        message.pool = {};
                    key = reader.string();
                    reader.pos++;
                    message.pool[key] = $root.dice.model_fairArena.PoolInfo.decode(reader, reader.uint32());
                    break;
                case 6:
                    reader.skip().pos++;
                    if (message.rewards === $util.emptyObject)
                        message.rewards = {};
                    key = reader.string();
                    reader.pos++;
                    message.rewards[key] = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a model_fairArena message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.model_fairArena
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.model_fairArena} model_fairArena
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        model_fairArena.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a model_fairArena message.
         * @function verify
         * @memberof dice.model_fairArena
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        model_fairArena.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.status != null && message.hasOwnProperty("status"))
                if (!$util.isInteger(message.status))
                    return "status: integer expected";
            if (message.winNum != null && message.hasOwnProperty("winNum"))
                if (!$util.isInteger(message.winNum))
                    return "winNum: integer expected";
            if (message.loseNum != null && message.hasOwnProperty("loseNum"))
                if (!$util.isInteger(message.loseNum))
                    return "loseNum: integer expected";
            if (message.line != null && message.hasOwnProperty("line")) {
                if (!Array.isArray(message.line))
                    return "line: array expected";
                for (var i = 0; i < message.line.length; ++i) {
                    var error = $root.dice.model_fairArena.lineInfo.verify(message.line[i]);
                    if (error)
                        return "line." + error;
                }
            }
            if (message.pool != null && message.hasOwnProperty("pool")) {
                if (!$util.isObject(message.pool))
                    return "pool: object expected";
                var key = Object.keys(message.pool);
                for (var i = 0; i < key.length; ++i) {
                    var error = $root.dice.model_fairArena.PoolInfo.verify(message.pool[key[i]]);
                    if (error)
                        return "pool." + error;
                }
            }
            if (message.rewards != null && message.hasOwnProperty("rewards")) {
                if (!$util.isObject(message.rewards))
                    return "rewards: object expected";
                var key = Object.keys(message.rewards);
                for (var i = 0; i < key.length; ++i)
                    if (!$util.isInteger(message.rewards[key[i]]))
                        return "rewards: integer{k:string} expected";
            }
            return null;
        };

        model_fairArena.lineInfo = (function() {

            /**
             * Properties of a lineInfo.
             * @memberof dice.model_fairArena
             * @interface IlineInfo
             * @property {string|null} [id] lineInfo id
             */

            /**
             * Constructs a new lineInfo.
             * @memberof dice.model_fairArena
             * @classdesc Represents a lineInfo.
             * @implements IlineInfo
             * @constructor
             * @param {dice.model_fairArena.IlineInfo=} [properties] Properties to set
             */
            function lineInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * lineInfo id.
             * @member {string} id
             * @memberof dice.model_fairArena.lineInfo
             * @instance
             */
            lineInfo.prototype.id = "";

            /**
             * Creates a new lineInfo instance using the specified properties.
             * @function create
             * @memberof dice.model_fairArena.lineInfo
             * @static
             * @param {dice.model_fairArena.IlineInfo=} [properties] Properties to set
             * @returns {dice.model_fairArena.lineInfo} lineInfo instance
             */
            lineInfo.create = function create(properties) {
                return new lineInfo(properties);
            };

            /**
             * Encodes the specified lineInfo message. Does not implicitly {@link dice.model_fairArena.lineInfo.verify|verify} messages.
             * @function encode
             * @memberof dice.model_fairArena.lineInfo
             * @static
             * @param {dice.model_fairArena.IlineInfo} message lineInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            lineInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                return writer;
            };

            /**
             * Encodes the specified lineInfo message, length delimited. Does not implicitly {@link dice.model_fairArena.lineInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dice.model_fairArena.lineInfo
             * @static
             * @param {dice.model_fairArena.IlineInfo} message lineInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            lineInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a lineInfo message from the specified reader or buffer.
             * @function decode
             * @memberof dice.model_fairArena.lineInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dice.model_fairArena.lineInfo} lineInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            lineInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.model_fairArena.lineInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a lineInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dice.model_fairArena.lineInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dice.model_fairArena.lineInfo} lineInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            lineInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a lineInfo message.
             * @function verify
             * @memberof dice.model_fairArena.lineInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            lineInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                return null;
            };

            return lineInfo;
        })();

        model_fairArena.PoolInfo = (function() {

            /**
             * Properties of a PoolInfo.
             * @memberof dice.model_fairArena
             * @interface IPoolInfo
             * @property {Array.<string>|null} [list] PoolInfo list
             */

            /**
             * Constructs a new PoolInfo.
             * @memberof dice.model_fairArena
             * @classdesc Represents a PoolInfo.
             * @implements IPoolInfo
             * @constructor
             * @param {dice.model_fairArena.IPoolInfo=} [properties] Properties to set
             */
            function PoolInfo(properties) {
                this.list = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * PoolInfo list.
             * @member {Array.<string>} list
             * @memberof dice.model_fairArena.PoolInfo
             * @instance
             */
            PoolInfo.prototype.list = $util.emptyArray;

            /**
             * Creates a new PoolInfo instance using the specified properties.
             * @function create
             * @memberof dice.model_fairArena.PoolInfo
             * @static
             * @param {dice.model_fairArena.IPoolInfo=} [properties] Properties to set
             * @returns {dice.model_fairArena.PoolInfo} PoolInfo instance
             */
            PoolInfo.create = function create(properties) {
                return new PoolInfo(properties);
            };

            /**
             * Encodes the specified PoolInfo message. Does not implicitly {@link dice.model_fairArena.PoolInfo.verify|verify} messages.
             * @function encode
             * @memberof dice.model_fairArena.PoolInfo
             * @static
             * @param {dice.model_fairArena.IPoolInfo} message PoolInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PoolInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.list != null && message.list.length)
                    for (var i = 0; i < message.list.length; ++i)
                        writer.uint32(/* id 6, wireType 2 =*/50).string(message.list[i]);
                return writer;
            };

            /**
             * Encodes the specified PoolInfo message, length delimited. Does not implicitly {@link dice.model_fairArena.PoolInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dice.model_fairArena.PoolInfo
             * @static
             * @param {dice.model_fairArena.IPoolInfo} message PoolInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PoolInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a PoolInfo message from the specified reader or buffer.
             * @function decode
             * @memberof dice.model_fairArena.PoolInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dice.model_fairArena.PoolInfo} PoolInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PoolInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.model_fairArena.PoolInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 6:
                        if (!(message.list && message.list.length))
                            message.list = [];
                        message.list.push(reader.string());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a PoolInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dice.model_fairArena.PoolInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dice.model_fairArena.PoolInfo} PoolInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PoolInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a PoolInfo message.
             * @function verify
             * @memberof dice.model_fairArena.PoolInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PoolInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.list != null && message.hasOwnProperty("list")) {
                    if (!Array.isArray(message.list))
                        return "list: array expected";
                    for (var i = 0; i < message.list.length; ++i)
                        if (!$util.isString(message.list[i]))
                            return "list: string[] expected";
                }
                return null;
            };

            return PoolInfo;
        })();

        return model_fairArena;
    })();

    dice.model_signinfo = (function() {

        /**
         * Properties of a model_signinfo.
         * @memberof dice
         * @interface Imodel_signinfo
         * @property {Object.<string,number>|null} [info] model_signinfo info
         * @property {number|null} [days] model_signinfo days
         * @property {number|null} [hasSign] model_signinfo hasSign
         * @property {number|null} [renameNum] model_signinfo renameNum
         * @property {number|null} [payFlag] model_signinfo payFlag
         * @property {number|null} [lastday] model_signinfo lastday
         */

        /**
         * Constructs a new model_signinfo.
         * @memberof dice
         * @classdesc Represents a model_signinfo.
         * @implements Imodel_signinfo
         * @constructor
         * @param {dice.Imodel_signinfo=} [properties] Properties to set
         */
        function model_signinfo(properties) {
            this.info = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * model_signinfo info.
         * @member {Object.<string,number>} info
         * @memberof dice.model_signinfo
         * @instance
         */
        model_signinfo.prototype.info = $util.emptyObject;

        /**
         * model_signinfo days.
         * @member {number} days
         * @memberof dice.model_signinfo
         * @instance
         */
        model_signinfo.prototype.days = 0;

        /**
         * model_signinfo hasSign.
         * @member {number} hasSign
         * @memberof dice.model_signinfo
         * @instance
         */
        model_signinfo.prototype.hasSign = 0;

        /**
         * model_signinfo renameNum.
         * @member {number} renameNum
         * @memberof dice.model_signinfo
         * @instance
         */
        model_signinfo.prototype.renameNum = 0;

        /**
         * model_signinfo payFlag.
         * @member {number} payFlag
         * @memberof dice.model_signinfo
         * @instance
         */
        model_signinfo.prototype.payFlag = 0;

        /**
         * model_signinfo lastday.
         * @member {number} lastday
         * @memberof dice.model_signinfo
         * @instance
         */
        model_signinfo.prototype.lastday = 0;

        /**
         * Creates a new model_signinfo instance using the specified properties.
         * @function create
         * @memberof dice.model_signinfo
         * @static
         * @param {dice.Imodel_signinfo=} [properties] Properties to set
         * @returns {dice.model_signinfo} model_signinfo instance
         */
        model_signinfo.create = function create(properties) {
            return new model_signinfo(properties);
        };

        /**
         * Encodes the specified model_signinfo message. Does not implicitly {@link dice.model_signinfo.verify|verify} messages.
         * @function encode
         * @memberof dice.model_signinfo
         * @static
         * @param {dice.Imodel_signinfo} message model_signinfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        model_signinfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.info != null && message.hasOwnProperty("info"))
                for (var keys = Object.keys(message.info), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 0 =*/16).int32(message.info[keys[i]]).ldelim();
            if (message.days != null && message.hasOwnProperty("days"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.days);
            if (message.hasSign != null && message.hasOwnProperty("hasSign"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.hasSign);
            if (message.renameNum != null && message.hasOwnProperty("renameNum"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.renameNum);
            if (message.payFlag != null && message.hasOwnProperty("payFlag"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.payFlag);
            if (message.lastday != null && message.hasOwnProperty("lastday"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.lastday);
            return writer;
        };

        /**
         * Encodes the specified model_signinfo message, length delimited. Does not implicitly {@link dice.model_signinfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.model_signinfo
         * @static
         * @param {dice.Imodel_signinfo} message model_signinfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        model_signinfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a model_signinfo message from the specified reader or buffer.
         * @function decode
         * @memberof dice.model_signinfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.model_signinfo} model_signinfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        model_signinfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.model_signinfo(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    reader.skip().pos++;
                    if (message.info === $util.emptyObject)
                        message.info = {};
                    key = reader.string();
                    reader.pos++;
                    message.info[key] = reader.int32();
                    break;
                case 2:
                    message.days = reader.int32();
                    break;
                case 3:
                    message.hasSign = reader.int32();
                    break;
                case 4:
                    message.renameNum = reader.int32();
                    break;
                case 5:
                    message.payFlag = reader.int32();
                    break;
                case 6:
                    message.lastday = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a model_signinfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.model_signinfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.model_signinfo} model_signinfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        model_signinfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a model_signinfo message.
         * @function verify
         * @memberof dice.model_signinfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        model_signinfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.info != null && message.hasOwnProperty("info")) {
                if (!$util.isObject(message.info))
                    return "info: object expected";
                var key = Object.keys(message.info);
                for (var i = 0; i < key.length; ++i)
                    if (!$util.isInteger(message.info[key[i]]))
                        return "info: integer{k:string} expected";
            }
            if (message.days != null && message.hasOwnProperty("days"))
                if (!$util.isInteger(message.days))
                    return "days: integer expected";
            if (message.hasSign != null && message.hasOwnProperty("hasSign"))
                if (!$util.isInteger(message.hasSign))
                    return "hasSign: integer expected";
            if (message.renameNum != null && message.hasOwnProperty("renameNum"))
                if (!$util.isInteger(message.renameNum))
                    return "renameNum: integer expected";
            if (message.payFlag != null && message.hasOwnProperty("payFlag"))
                if (!$util.isInteger(message.payFlag))
                    return "payFlag: integer expected";
            if (message.lastday != null && message.hasOwnProperty("lastday"))
                if (!$util.isInteger(message.lastday))
                    return "lastday: integer expected";
            return null;
        };

        return model_signinfo;
    })();

    dice.model_inviteFriend = (function() {

        /**
         * Properties of a model_inviteFriend.
         * @memberof dice
         * @interface Imodel_inviteFriend
         * @property {string|null} [code] model_inviteFriend code
         * @property {number|null} [score] model_inviteFriend score
         * @property {number|null} [iscore] model_inviteFriend iscore
         * @property {Object.<string,number>|null} [rinfo] model_inviteFriend rinfo
         * @property {number|null} [iuid] model_inviteFriend iuid
         */

        /**
         * Constructs a new model_inviteFriend.
         * @memberof dice
         * @classdesc Represents a model_inviteFriend.
         * @implements Imodel_inviteFriend
         * @constructor
         * @param {dice.Imodel_inviteFriend=} [properties] Properties to set
         */
        function model_inviteFriend(properties) {
            this.rinfo = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * model_inviteFriend code.
         * @member {string} code
         * @memberof dice.model_inviteFriend
         * @instance
         */
        model_inviteFriend.prototype.code = "";

        /**
         * model_inviteFriend score.
         * @member {number} score
         * @memberof dice.model_inviteFriend
         * @instance
         */
        model_inviteFriend.prototype.score = 0;

        /**
         * model_inviteFriend iscore.
         * @member {number} iscore
         * @memberof dice.model_inviteFriend
         * @instance
         */
        model_inviteFriend.prototype.iscore = 0;

        /**
         * model_inviteFriend rinfo.
         * @member {Object.<string,number>} rinfo
         * @memberof dice.model_inviteFriend
         * @instance
         */
        model_inviteFriend.prototype.rinfo = $util.emptyObject;

        /**
         * model_inviteFriend iuid.
         * @member {number} iuid
         * @memberof dice.model_inviteFriend
         * @instance
         */
        model_inviteFriend.prototype.iuid = 0;

        /**
         * Creates a new model_inviteFriend instance using the specified properties.
         * @function create
         * @memberof dice.model_inviteFriend
         * @static
         * @param {dice.Imodel_inviteFriend=} [properties] Properties to set
         * @returns {dice.model_inviteFriend} model_inviteFriend instance
         */
        model_inviteFriend.create = function create(properties) {
            return new model_inviteFriend(properties);
        };

        /**
         * Encodes the specified model_inviteFriend message. Does not implicitly {@link dice.model_inviteFriend.verify|verify} messages.
         * @function encode
         * @memberof dice.model_inviteFriend
         * @static
         * @param {dice.Imodel_inviteFriend} message model_inviteFriend message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        model_inviteFriend.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && message.hasOwnProperty("code"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.code);
            if (message.score != null && message.hasOwnProperty("score"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.score);
            if (message.iscore != null && message.hasOwnProperty("iscore"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.iscore);
            if (message.rinfo != null && message.hasOwnProperty("rinfo"))
                for (var keys = Object.keys(message.rinfo), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 4, wireType 2 =*/34).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 0 =*/16).int32(message.rinfo[keys[i]]).ldelim();
            if (message.iuid != null && message.hasOwnProperty("iuid"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.iuid);
            return writer;
        };

        /**
         * Encodes the specified model_inviteFriend message, length delimited. Does not implicitly {@link dice.model_inviteFriend.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.model_inviteFriend
         * @static
         * @param {dice.Imodel_inviteFriend} message model_inviteFriend message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        model_inviteFriend.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a model_inviteFriend message from the specified reader or buffer.
         * @function decode
         * @memberof dice.model_inviteFriend
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.model_inviteFriend} model_inviteFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        model_inviteFriend.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.model_inviteFriend(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.code = reader.string();
                    break;
                case 2:
                    message.score = reader.int32();
                    break;
                case 3:
                    message.iscore = reader.int32();
                    break;
                case 4:
                    reader.skip().pos++;
                    if (message.rinfo === $util.emptyObject)
                        message.rinfo = {};
                    key = reader.string();
                    reader.pos++;
                    message.rinfo[key] = reader.int32();
                    break;
                case 5:
                    message.iuid = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a model_inviteFriend message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.model_inviteFriend
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.model_inviteFriend} model_inviteFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        model_inviteFriend.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a model_inviteFriend message.
         * @function verify
         * @memberof dice.model_inviteFriend
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        model_inviteFriend.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isString(message.code))
                    return "code: string expected";
            if (message.score != null && message.hasOwnProperty("score"))
                if (!$util.isInteger(message.score))
                    return "score: integer expected";
            if (message.iscore != null && message.hasOwnProperty("iscore"))
                if (!$util.isInteger(message.iscore))
                    return "iscore: integer expected";
            if (message.rinfo != null && message.hasOwnProperty("rinfo")) {
                if (!$util.isObject(message.rinfo))
                    return "rinfo: object expected";
                var key = Object.keys(message.rinfo);
                for (var i = 0; i < key.length; ++i)
                    if (!$util.isInteger(message.rinfo[key[i]]))
                        return "rinfo: integer{k:string} expected";
            }
            if (message.iuid != null && message.hasOwnProperty("iuid"))
                if (!$util.isInteger(message.iuid))
                    return "iuid: integer expected";
            return null;
        };

        return model_inviteFriend;
    })();

    dice.model_achievement = (function() {

        /**
         * Properties of a model_achievement.
         * @memberof dice
         * @interface Imodel_achievement
         * @property {Object.<string,dice.model_achievement.IAchinfo>|null} [info] model_achievement info
         */

        /**
         * Constructs a new model_achievement.
         * @memberof dice
         * @classdesc Represents a model_achievement.
         * @implements Imodel_achievement
         * @constructor
         * @param {dice.Imodel_achievement=} [properties] Properties to set
         */
        function model_achievement(properties) {
            this.info = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * model_achievement info.
         * @member {Object.<string,dice.model_achievement.IAchinfo>} info
         * @memberof dice.model_achievement
         * @instance
         */
        model_achievement.prototype.info = $util.emptyObject;

        /**
         * Creates a new model_achievement instance using the specified properties.
         * @function create
         * @memberof dice.model_achievement
         * @static
         * @param {dice.Imodel_achievement=} [properties] Properties to set
         * @returns {dice.model_achievement} model_achievement instance
         */
        model_achievement.create = function create(properties) {
            return new model_achievement(properties);
        };

        /**
         * Encodes the specified model_achievement message. Does not implicitly {@link dice.model_achievement.verify|verify} messages.
         * @function encode
         * @memberof dice.model_achievement
         * @static
         * @param {dice.Imodel_achievement} message model_achievement message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        model_achievement.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.info != null && message.hasOwnProperty("info"))
                for (var keys = Object.keys(message.info), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                    $root.dice.model_achievement.Achinfo.encode(message.info[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                }
            return writer;
        };

        /**
         * Encodes the specified model_achievement message, length delimited. Does not implicitly {@link dice.model_achievement.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dice.model_achievement
         * @static
         * @param {dice.Imodel_achievement} message model_achievement message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        model_achievement.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a model_achievement message from the specified reader or buffer.
         * @function decode
         * @memberof dice.model_achievement
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dice.model_achievement} model_achievement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        model_achievement.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.model_achievement(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    reader.skip().pos++;
                    if (message.info === $util.emptyObject)
                        message.info = {};
                    key = reader.string();
                    reader.pos++;
                    message.info[key] = $root.dice.model_achievement.Achinfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a model_achievement message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dice.model_achievement
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dice.model_achievement} model_achievement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        model_achievement.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a model_achievement message.
         * @function verify
         * @memberof dice.model_achievement
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        model_achievement.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.info != null && message.hasOwnProperty("info")) {
                if (!$util.isObject(message.info))
                    return "info: object expected";
                var key = Object.keys(message.info);
                for (var i = 0; i < key.length; ++i) {
                    var error = $root.dice.model_achievement.Achinfo.verify(message.info[key[i]]);
                    if (error)
                        return "info." + error;
                }
            }
            return null;
        };

        model_achievement.Achinfo = (function() {

            /**
             * Properties of an Achinfo.
             * @memberof dice.model_achievement
             * @interface IAchinfo
             * @property {number|null} [stage] Achinfo stage
             * @property {number|null} [v] Achinfo v
             * @property {number|null} [f] Achinfo f
             */

            /**
             * Constructs a new Achinfo.
             * @memberof dice.model_achievement
             * @classdesc Represents an Achinfo.
             * @implements IAchinfo
             * @constructor
             * @param {dice.model_achievement.IAchinfo=} [properties] Properties to set
             */
            function Achinfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Achinfo stage.
             * @member {number} stage
             * @memberof dice.model_achievement.Achinfo
             * @instance
             */
            Achinfo.prototype.stage = 0;

            /**
             * Achinfo v.
             * @member {number} v
             * @memberof dice.model_achievement.Achinfo
             * @instance
             */
            Achinfo.prototype.v = 0;

            /**
             * Achinfo f.
             * @member {number} f
             * @memberof dice.model_achievement.Achinfo
             * @instance
             */
            Achinfo.prototype.f = 0;

            /**
             * Creates a new Achinfo instance using the specified properties.
             * @function create
             * @memberof dice.model_achievement.Achinfo
             * @static
             * @param {dice.model_achievement.IAchinfo=} [properties] Properties to set
             * @returns {dice.model_achievement.Achinfo} Achinfo instance
             */
            Achinfo.create = function create(properties) {
                return new Achinfo(properties);
            };

            /**
             * Encodes the specified Achinfo message. Does not implicitly {@link dice.model_achievement.Achinfo.verify|verify} messages.
             * @function encode
             * @memberof dice.model_achievement.Achinfo
             * @static
             * @param {dice.model_achievement.IAchinfo} message Achinfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Achinfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.stage != null && message.hasOwnProperty("stage"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.stage);
                if (message.v != null && message.hasOwnProperty("v"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.v);
                if (message.f != null && message.hasOwnProperty("f"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.f);
                return writer;
            };

            /**
             * Encodes the specified Achinfo message, length delimited. Does not implicitly {@link dice.model_achievement.Achinfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dice.model_achievement.Achinfo
             * @static
             * @param {dice.model_achievement.IAchinfo} message Achinfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Achinfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Achinfo message from the specified reader or buffer.
             * @function decode
             * @memberof dice.model_achievement.Achinfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dice.model_achievement.Achinfo} Achinfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Achinfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dice.model_achievement.Achinfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.stage = reader.int32();
                        break;
                    case 2:
                        message.v = reader.int32();
                        break;
                    case 3:
                        message.f = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Achinfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dice.model_achievement.Achinfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dice.model_achievement.Achinfo} Achinfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Achinfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Achinfo message.
             * @function verify
             * @memberof dice.model_achievement.Achinfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Achinfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.stage != null && message.hasOwnProperty("stage"))
                    if (!$util.isInteger(message.stage))
                        return "stage: integer expected";
                if (message.v != null && message.hasOwnProperty("v"))
                    if (!$util.isInteger(message.v))
                        return "v: integer expected";
                if (message.f != null && message.hasOwnProperty("f"))
                    if (!$util.isInteger(message.f))
                        return "f: integer expected";
                return null;
            };

            return Achinfo;
        })();

        return model_achievement;
    })();

    return dice;
})();