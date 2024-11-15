---
title: "Java 单例模式详解及五种实现方式"
date: 2022-09-21 20:15:01
excerpt: 单例模式确保某个类同时只存在一个实例，并向整个系统提供这一个实例。在具有“资源管理”功能的系统常常被设计成单例模式。比如一台电脑可以连接多台打印机，但只能有一个打印任务池，避免两个打印作业同时上传到打印机。类似的应用场景还有线程池、日志操作、对话框、硬件驱动程序等。单例模式保证全局对象的唯一性，例如多个子系统读写同一份配置文件就需要保证配置的一致性。
tags:
  - java
---

# 定义

单例模式确保某个类同时只存在一个实例，并向整个系统提供这一个实例。在具有“资源管理”功能的系统常常被设计成单例模式。比如一台电脑可以连接多台打印机，但只能有一个打印任务池，避免两个打印作业同时上传到打印机。类似的应用场景还有线程池、日志操作、对话框、硬件驱动程序等。单例模式保证全局对象的唯一性，例如多个子系统读写同一份配置文件就需要保证配置的一致性。

> 单例模式就是为了避免出现不一致的状态，导致系统进入不可预料的状况

# 特点
1. 一个单例类同一时间只能存在一个实例
2. 唯一的单例实例必须由所属的单例类自己创建
3. 单例类需要向所有对象提供同一个实例
# 实现

## Hungry (饿汉式)

> 这是单例模式中最简单的一种实现方式，但是存在非常明显的问题，单例还没有使用的时候就已经被初始化，也就是哪怕程序从头到尾都没使用这个单例，单例的对象还是会被创建，造成不必要的资源浪费。

| 优点                                       | 缺点                                     | 可用程度 |
| ------------------------------------------ | ---------------------------------------- | -------- |
| 写法简单；类装载即实例化，避免线程同步问题 | 没有 Lazy Loading 机制，容易造成内存浪费 | 可用     |

| 线程安全 | 调用效率 | 延迟加载 |
| -------- | -------- | -------- |
| ✅        | ✅        | ❌        |

```java
public class Singleton {
    private final static Singleton instance = new Singleton;
    private Singleton() {}
    public static Singleton getInstance() {
        return instance;
    }
}
```

## Lazy (懒汉式)

> 类初始化时不会初始化对象实例，实现了延时加载，但是公开方法同步加载，所以调用效率低。

| 优点              | 缺点                                              | 可用程度 |
| ----------------- | ------------------------------------------------- | -------- |
| 实现 Lazy Loading | 效率极低。每次调用 getInstance() 方法都要等待同步 | 不推荐   |

| 线程安全 | 调用效率 | 延迟加载 |
| -------- | -------- | -------- |
| ✅        | ❌        | ✅        |

```java
public class Singleton {
    private static Singleton instance;
    private Singleton() {}
    public static synchronized Singleton getInstance() {
        if(instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```

## DCL (双重锁判断机制)

> DCL 即 Double-Check Lock, 对 singleton 进行两次检查确保了线程安全，且实例化代码只执行一次，再次访问时判断 singleton 为 null，则直接返回新的实例。

| 优点                                | 缺点 | 可用程度 |
| ----------------------------------- | ---- | -------- |
| 线程安全；效率高；实现 Lazy Loading | -    | 推荐     |

| 线程安全 | 调用效率 | 延迟加载 |
| -------- | -------- | -------- |
| ✅        | ✅        | ✅        |

```java
public class Singleton {
    private volatile static Singleton instance;
    private Singleton() {}
    public static Singleton getInstance() {
        if(instance == null) {
            synchronized (Singleton.class) {
                if(instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```

## static (静态内部类)

> 这种方法与饿汉式的机制类似但不相同。两者的基本原理都是利用类装载的机制保证初始化实例时只有一个线程，不同之处在于，饿汉式一旦 Singleton 类被装载就会实例化，没有延时加载；儿静态内部类在被装载时不会立即实例化，而是在需要时通过调用 getInstance() 方法装载 SingletonInstance 类，完成实例化。类中的静态字段只会在第一次加载的时候初始化，所以这里我们借助 JVM 的机制保证了线程安全。

| 优点                                | 缺点 | 可用程度 |
| ----------------------------------- | ---- | -------- |
| 线程安全；效率高；实现 Lazy Loading | -    | 推荐     |

| 线程安全 | 调用效率 | 延迟加载 |
| -------- | -------- | -------- |
| ✅        | ✅        | ✅        |

```java
public class Singleton {
    private static class SingletonInstance {
        private static final Singleton instance = new Singleton();
    }
    private Singleton() {}
    public static Singleton getInstance() {
        return SingletonInstance.instance;
    }
}
```

## enum (枚举类)

| 优点                           | 缺点 | 可用程度 |
| ------------------------------ | ---- | -------- |
| 线程安全；效率高；安全性天花板 | -    | 推荐     |

| 线程安全 | 调用效率 | 延迟加载 |
| -------- | -------- | -------- |
| ✅        | ✅        | ❌        |

> 线程安全，调用效率高，不可延时加载，因 JVM 自身的特性，可以天然地防止反射和反序列化调用

```java
public enum Singleton {
    INSTANCE;
    public void singletonOartion() {
        /* your operations here... */
    }
}
```

# 优缺点

## 优点

系统内存中同一时间只存在唯一实例，节省系统资源。对于数据库操作、文件 IO 或者需要频繁创建销毁的对象，可以提高系统性能。

## 缺点

团队开发中，其他成员想要实例化一个单例时不能 new，而必须记住或注意相应的获取对象的方法，在无法阅读源码时会带来困扰。

# 使用场景
1. 需要频繁创建销毁对象
2. 创建对象耗时、资源过多且常用
3. 频繁访问数据库或读写文件的对象
4. 工具类
