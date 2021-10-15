/*
 * 작성자 : 강현욱
 * 작성일 : 2021.10.14
 */

package com.board.entity;

import lombok.Data;
import org.springframework.web.bind.annotation.GetMapping;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity //내가 만들었던 컬럼들을 적으면 된다.
@Data
public class Board {

    @Id //PK를 의미
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;

    private String content;
}




