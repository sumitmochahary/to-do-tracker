package com.project.task_service.repository;

import com.project.task_service.domain.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {  // Changed Integer to String

        List<Task> findByUserId(String userId);
        List<Task> findByTaskCategory(String taskCategory);
        List<Task> findByTaskStatus(String taskStatus);
        List<Task> findByTaskDueDate(LocalDate taskDueDate);
        List<Task> findByUserIdAndArchived(String userId, boolean archived);
}

