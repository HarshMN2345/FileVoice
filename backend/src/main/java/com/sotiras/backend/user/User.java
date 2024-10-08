package com.sotiras.backend.user;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="_user")
public class User {
    @Id
    @GeneratedValue
    private Integer id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;

}
