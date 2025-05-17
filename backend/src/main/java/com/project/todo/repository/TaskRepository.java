package com.project.todo.repository;

import com.project.todo.domain.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {  // Changed Integer to String

        List<Task> findByUserId(String userId);
        List<Task> findByTaskCategory(String taskCategory);
        List<Task> findByTaskStatus(String taskStatus);
        List<Task> findByTaskDueDate(LocalDate taskDueDate);
        Optional<Task> findById(String id);  // Changed from findByTaskId to findById
        List<Task> findByArchived(boolean archived);
}

