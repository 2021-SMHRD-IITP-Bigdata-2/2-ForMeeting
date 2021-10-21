package com.board.repository;

import com.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board, Integer> {
                                        //내가 만든 Board엔터티, PK로 지정한 컬럼의 타입 지정

}
