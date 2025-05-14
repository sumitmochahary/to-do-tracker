package com.project.todo.repository;

import com.project.todo.domain.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
@Repository
public interface TaskRepository extends MongoRepository<Task,String> {
        List<Task> findByTaskCategory(String tCategory);
        List<Task> findByTaskStatus(String tStatus);
        List<Task> findByTaskDueDate(LocalDate tDueDate);
        List<Task> findByUserId(String userId); // Optional: filter tasks by user
    }

