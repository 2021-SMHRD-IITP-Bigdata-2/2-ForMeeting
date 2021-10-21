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

@Entity //클래스 Board가 DB에 있는 테이블을 의미
@Data //BoardController에서 get~를 실행할 수 있도록 해줌
public class Board {

    @Id //PK를 의미
    @GeneratedValue(strategy = GenerationType.IDENTITY) //IDENTITY:마리아DB에서 사용
    private Integer id;

    private String title;

    private String content;

    private Integer view;
}




