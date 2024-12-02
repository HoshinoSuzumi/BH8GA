---
title: CRC16 校验详解及在 Java 中的实现
date: 2019-09-11 17:36:00
excerpt: 'CRC (Cyclic Redundancy Check)，循环冗余校验，根据网络数据包或电脑文件等数据产生简短固定位数校验码的快速算法'
tags:
  - java
---

# 校验原理和步骤

1. 预置1个16位的寄存器为十六进制FFFF（即全为1），称此寄存器为CRC寄存器；
2. 把第一个8位二进制数据（既通讯信息帧的第一个字节）与16位的CRC寄存器的低8位相异或，把结果放于CRC寄存器，高八位数据不变；
3. 把CRC寄存器的内容右移一位（朝低位）用0填补最高位，并检查右移后的移出位；
4. 如果移出位为0：重复第3步（再次右移一位）；如果移出位为1，CRC寄存器与多项式A001（1010 0000 0000 0001）进行异或；
5. 重复步骤3和4，直到右移8次，这样整个8位数据全部进行了处理；
6. 重复步骤2到步骤5，进行通讯信息帧下一个字节的处理；
7. 将该通讯信息帧所有字节按上述步骤计算完成后，得到的16位CRC寄存器的高、低字节进行交换；
8. 最后得到的CRC寄存器内容即为：CRC码。

* 以上计算步骤中的多项式 0xA001 是 0x8005 按位颠倒后的结果。
* 0x8408 是 0x1021 按位颠倒后的结果。
  

# Java 实现

```java
/**
 * Author:  HoshinoSuzumi
 * Time:    2019/09/11 16:09
 */
public class CRC16 {
 
    /**
     * @param buffer
     * @return
     */
    public static int CRC16_CCITT(byte[] buffer) {
        int wCRCin = 0x0000;
        int wCPoly = 0x8408;
        for (byte b : buffer) {
            wCRCin ^= ((int) b & 0x00ff);
            for (int j = 0; j < 8; j++) {
                if ((wCRCin & 0x0001) != 0) {
                    wCRCin >>= 1;
                    wCRCin ^= wCPoly;
                } else {
                    wCRCin >>= 1;
                }
            }
        }
        return wCRCin ^= 0x0000;
 
    }
 
    /**
     * @param buffer
     * @return
     */
    public static int CRC16_CCITT_FALSE(byte[] buffer) {
        int wCRCin = 0xffff;
        int wCPoly = 0x1021;
        for (byte b : buffer) {
            for (int i = 0; i < 8; i++) {
                boolean bit = ((b >> (7 - i) & 1) == 1);
                boolean c15 = ((wCRCin >> 15 & 1) == 1);
                wCRCin <<= 1;
                if (c15 ^ bit)
                    wCRCin ^= wCPoly;
            }
        }
        wCRCin &= 0xffff;
        return wCRCin ^= 0x0000;
    }
 
    /**
     * @param buffer
     * @return
     */
    public static int CRC16_XMODEM(byte[] buffer) {
        int wCRCin = 0x0000;
        int wCPoly = 0x1021;
        for (byte b : buffer) {
            for (int i = 0; i < 8; i++) {
                boolean bit = ((b >> (7 - i) & 1) == 1);
                boolean c15 = ((wCRCin >> 15 & 1) == 1);
                wCRCin <<= 1;
                if (c15 ^ bit)
                    wCRCin ^= wCPoly;
            }
        }
        wCRCin &= 0xffff;
        return wCRCin ^= 0x0000;
    }
 
 
    /**
     * @param buffer
     * @return
     */
    public static int CRC16_X25(byte[] buffer) {
        int wCRCin = 0xffff;
        int wCPoly = 0x8408;
        for (byte b : buffer) {
            wCRCin ^= ((int) b & 0x00ff);
            for (int j = 0; j < 8; j++) {
                if ((wCRCin & 0x0001) != 0) {
                    wCRCin >>= 1;
                    wCRCin ^= wCPoly;
                } else {
                    wCRCin >>= 1;
                }
            }
        }
        return wCRCin ^= 0xffff;
    }
 
    /**
     * @param buffer
     * @return
     */
    public static int CRC16_MODBUS(byte[] buffer) {
        int wCRCin = 0xffff;
        int POLYNOMIAL = 0xa001;
        for (byte b : buffer) {
            wCRCin ^= ((int) b & 0x00ff);
            for (int j = 0; j < 8; j++) {
                if ((wCRCin & 0x0001) != 0) {
                    wCRCin >>= 1;
                    wCRCin ^= POLYNOMIAL;
                } else {
                    wCRCin >>= 1;
                }
            }
        }
        return wCRCin ^= 0x0000;
    }
 
    /**
     * @param buffer
     * @return
     */
    public static int CRC16_IBM(byte[] buffer) {
        int wCRCin = 0x0000;
        int wCPoly = 0xa001;
        for (byte b : buffer) {
            wCRCin ^= ((int) b & 0x00ff);
            for (int j = 0; j < 8; j++) {
                if ((wCRCin & 0x0001) != 0) {
                    wCRCin >>= 1;
                    wCRCin ^= wCPoly;
                } else {
                    wCRCin >>= 1;
                }
            }
        }
        return wCRCin ^= 0x0000;
    }
 
    /**
     * @param buffer
     * @return
     */
    public static int CRC16_MAXIM(byte[] buffer) {
        int wCRCin = 0x0000;
        int wCPoly = 0xa001;
        for (byte b : buffer) {
            wCRCin ^= ((int) b & 0x00ff);
            for (int j = 0; j < 8; j++) {
                if ((wCRCin & 0x0001) != 0) {
                    wCRCin >>= 1;
                    wCRCin ^= wCPoly;
                } else {
                    wCRCin >>= 1;
                }
            }
        }
        return wCRCin ^= 0xffff;
    }
 
    /**
     * @param buffer
     * @return
     */
    public static int CRC16_USB(byte[] buffer) {
        int wCRCin = 0xFFFF;
        int wCPoly = 0xa001;
        for (byte b : buffer) {
            wCRCin ^= ((int) b & 0x00ff);
            for (int j = 0; j < 8; j++) {
                if ((wCRCin & 0x0001) != 0) {
                    wCRCin >>= 1;
                    wCRCin ^= wCPoly;
                } else {
                    wCRCin >>= 1;
                }
            }
        }
        return wCRCin ^= 0xffff;
    }
 
    /**
     * @param buffer
     * @return
     */
    public static int CRC16_DNP(byte[] buffer) {
        int wCRCin = 0x0000;
        int wCPoly = 0xA6BC;
        for (byte b : buffer) {
            wCRCin ^= ((int) b & 0x00ff);
            for (int j = 0; j < 8; j++) {
                if ((wCRCin & 0x0001) != 0) {
                    wCRCin >>= 1;
                    wCRCin ^= wCPoly;
                } else {
                    wCRCin >>= 1;
                }
            }
        }
        return wCRCin ^= 0xffff;
    }
}
```

# 多项式速查表

| 校验方式          | 多项式                                          | 初始值 | 前/后 | 异或值 |
| ----------------- | ----------------------------------------------- | ------ | ----- | ------ |
| CRC16_CCITT       | x16+x12+x5+1（0x1021）                          | 0x0000 | 低/高 | 0x0000 |
| CRC16_CCITT_FALSE | x16+x12+x5+1（0x1021）                          | 0xFFFF | 高/低 | 0x0000 |
| CRC16_XMODEM      | x16+x12+x5+1（0x1021）                          | 0x0000 | 高/低 | 0x0000 |
| CRC16_X25         | x16+x12+x5+1（0x1021）                          | 0xFFFF | 低/高 | 0xFFFF |
| CRC16_MODBUS      | x16+x15+x2+1（0x8005）                          | 0xFFFF | 低/高 | 0x0000 |
| CRC16_IBM         | x16+x15+x2+1（0x8005）                          | 0x0000 | 低/高 | 0x0000 |
| CRC16_MAXIM       | x16+x15+x2+1（0x8005）                          | 0x0000 | 低/高 | 0xFFFF |
| CRC16_USB         | x16+x15+x2+1（0x8005）                          | 0xFFFF | 低/高 | 0xFFFF |
| CRC16_DNP         | x16+x13+x12+x11+x10+<br>x8+x6+x5+x2+1（0x3D65） | 0x0000 | 低/高 | 0xFFFF |

# 相关资料

[在线 CRC 校验工具 (by CTFever)](https://ctfever.uniiem.com/tools/crc-checksum)
